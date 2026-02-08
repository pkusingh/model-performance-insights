import type { SummaryRow } from "@/data/modelMetrics";
import { summaryColumns } from "@/data/modelMetrics";
import { MetricCell } from "./MetricCell";

interface SummaryTableProps {
  rows: SummaryRow[];
}

export function SummaryTable({ rows }: SummaryTableProps) {
  return (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <div className="px-4 py-2.5 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground font-sans">
          Per-Symbol Summary
          <span className="text-muted-foreground font-normal ml-2">— mean across symbols</span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground sticky left-0 bg-card z-10 min-w-[220px]">
                model
              </th>
              {summaryColumns.map((col) => (
                <th key={col} className="px-3 py-2 text-right text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.model} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="px-3 py-1.5 text-xs font-medium text-accent sticky left-0 bg-card z-10 truncate max-w-[220px]" title={row.model}>
                  {row.model}
                </td>
                {summaryColumns.map((col) => (
                  <MetricCell key={col} value={row.values[col] ?? null} metric={col} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
