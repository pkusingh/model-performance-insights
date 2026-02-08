#!/usr/bin/env python3
"""
Add this to your viewer.py or use standalone.
Exports model metrics data as JSON for the React dashboard.

Usage:
  python3 -m automation.viewer -p pipeline.yaml --summary --dashboard > src/data/modelMetrics.json
  
Or add --dashboard flag to your existing viewer.py
"""

import json
import sys


def export_dashboard_json(all_data, filters, metric_list, row_name="model", no_bias_bps=False):
    """
    Export data in format matching React ModelBlock[] and SummaryRow[] interfaces.
    
    Args:
        all_data: dict of {combo_name: DataFrame}
        filters: list of filter names (e.g., ["SYMBOLCOUNT_10000", "UNFILTERED"])
        metric_list: list of metrics to include
        row_name: row to extract (default: "model")
        no_bias_bps: if False, multiply bias values by 10000
    
    Returns:
        dict with modelBlocks and summaryRows
    """
    self_metrics = {'length', 'std', 'min', 'max', 'skew', 'kurtosis', 'autocorr'}
    preferred_targets = ['r1F', 'r250', 'r1sm', 'r5sm', 'r10sm', 'r30sm', 'r60sm', 'r120sm', 'r10log25']
    
    model_blocks = []
    summary_rows = []
    
    for filt in filters:
        if filt.startswith("SYMBOLS__"):
            continue
            
        for combo_name, df in all_data.items():
            # Determine available targets
            targets = []
            for t in preferred_targets:
                test_col = f"{filt}_corr_{t}"
                if test_col in df.columns:
                    targets.append(t)
            
            if not targets:
                continue
            
            # Get n value
            n = None
            length_col = f"{filt}_length_SELF"
            if length_col in df.columns and row_name in df.index:
                n = int(df.loc[row_name, length_col])
            
            # Build rows for this block
            rows = []
            display_metrics = [m for m in metric_list if m != 'length']
            
            for metric in display_metrics:
                row_data = {"metric": metric, "values": []}
                
                if metric in self_metrics:
                    col_name = f"{filt}_{metric}_SELF"
                    if col_name in df.columns and row_name in df.index:
                        val = df.loc[row_name, col_name]
                        row_data["values"].append(_clean_value(val))
                        # Fill rest with None for self-metrics
                        row_data["values"].extend([None] * (len(targets) - 1))
                    else:
                        row_data["values"] = [None] * len(targets)
                else:
                    for t in targets:
                        col_name = f"{filt}_{metric}_{t}"
                        if col_name in df.columns and row_name in df.index:
                            val = df.loc[row_name, col_name]
                            if metric.startswith("bias_") and not no_bias_bps:
                                val = val * 10000
                            row_data["values"].append(_clean_value(val))
                        else:
                            row_data["values"].append(None)
                
                rows.append(row_data)
            
            model_blocks.append({
                "name": combo_name,
                "n": n or 0,
                "columns": targets,
                "rows": rows,
                "filter": filt
            })
    
    # Build summary rows (per-symbol mean)
    symbol_filters = [f for f in filters if f.startswith("SYMBOLS__")]
    if symbol_filters:
        target = preferred_targets[4] if len(preferred_targets) > 4 else preferred_targets[0]  # r10sm default
        
        for combo_name, df in all_data.items():
            values = {}
            for metric in metric_list:
                vals = []
                for filt in symbol_filters:
                    col_name = f"{filt}_{metric}_{target}"
                    if col_name in df.columns and row_name in df.index:
                        val = df.loc[row_name, col_name]
                        if metric.startswith("bias_") and not no_bias_bps:
                            val = val * 10000
                        vals.append(val)
                
                if vals:
                    mean_val = sum(vals) / len(vals)
                    values[metric] = _clean_value(mean_val)
                else:
                    values[metric] = None
            
            # Truncate long model names for display
            short_name = _truncate_model_name(combo_name)
            summary_rows.append({
                "model": short_name,
                "fullName": combo_name,
                "values": values
            })
    
    return {
        "modelBlocks": model_blocks,
        "summaryRows": summary_rows,
        "summaryColumns": metric_list
    }


def _clean_value(val):
    """Convert pandas/numpy values to JSON-safe Python types."""
    import math
    if val is None:
        return None
    try:
        if math.isnan(val):
            return None
    except (TypeError, ValueError):
        pass
    if isinstance(val, (int, float)):
        return round(val, 4) if isinstance(val, float) else val
    return str(val)


def _truncate_model_name(name, max_len=30):
    """Truncate long model names with ellipsis."""
    if len(name) <= max_len:
        return name
    # Try to preserve important parts
    parts = name.split('_')
    if len(parts) >= 3:
        return f"{parts[0]}_{parts[1]}_…{parts[-1]}"
    return name[:max_len-1] + "…"


def generate_typescript_file(data, output_path="src/data/modelMetrics.ts"):
    """Generate TypeScript file with exported data."""
    
    ts_content = '''export interface ModelBlock {
  name: string;
  n: number;
  columns: string[];
  filter?: string;
  rows: {
    metric: string;
    values: (number | string | null)[];
  }[];
}

export interface SummaryRow {
  model: string;
  fullName?: string;
  values: Record<string, number | string | null>;
}

'''
    
    # Add columns constant
    if data["modelBlocks"]:
        cols = data["modelBlocks"][0]["columns"]
        ts_content += f'const columns = {json.dumps(cols)};\n\n'
    
    # Add model blocks
    ts_content += 'export const modelBlocks: ModelBlock[] = ' + json.dumps(data["modelBlocks"], indent=2) + ';\n\n'
    
    # Add summary columns
    ts_content += f'export const summaryColumns = {json.dumps(data["summaryColumns"])};\n\n'
    
    # Add summary rows
    ts_content += 'export const summaryRows: SummaryRow[] = ' + json.dumps(data["summaryRows"], indent=2) + ';\n'
    
    with open(output_path, 'w') as f:
        f.write(ts_content)
    
    print(f"Generated {output_path}", file=sys.stderr)


# Example integration into your existing viewer.py:
"""
Add to your argparse:
    parser.add_argument("--dashboard", action="store_true",
                        help="Export JSON for React dashboard")
    parser.add_argument("--dashboard-out", default="src/data/modelMetrics.ts",
                        help="Output path for dashboard TypeScript file")

Add to _summary_view function:
    if args.dashboard:
        from scripts.export_dashboard import export_dashboard_json, generate_typescript_file
        data = export_dashboard_json(all_data, main_filters + symbol_filters, metric_list, row_name, args.no_bias_bps)
        generate_typescript_file(data, args.dashboard_out)
        return
"""
