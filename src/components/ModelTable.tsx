import type { ModelBlock } from "@/data/modelMetrics";
import { MetricCell } from "./MetricCell";

interface ModelTableProps {
  block: ModelBlock;
}

export function ModelTable({ block }: ModelTableProps) {
  return (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <div className="px-4 py-2.5 border-b border-border flex items-baseline gap-3">
        <h3 className="text-sm font-semibold text-foreground font-sans truncate">
          {block.name}
        </h3>
        <span className="text-xs text-muted-foreground shrink-0">n={block.n}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground sticky left-0 bg-card z-10 min-w-[100px]">
                metric
              </th>
              {block.columns.map((col) => (
                <th key={col} className="px-3 py-2 text-right text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.metric} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="px-3 py-1.5 text-xs font-medium text-accent sticky left-0 bg-card z-10">
                  {row.metric}
                </td>
                {row.values.map((val, i) => (
                  <MetricCell key={i} value={val} metric={row.metric} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
