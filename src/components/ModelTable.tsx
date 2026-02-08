import type { ModelBlock } from "@/data/modelMetrics";
import { MetricCell } from "./MetricCell";
import { ModelHeader } from "./ModelHeader";
import { RETURN_HORIZONS } from "@/lib/parseModelName";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ModelTableProps {
  block: ModelBlock;
}

export function ModelTable({ block }: ModelTableProps) {
  return (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <ModelHeader name={block.name} n={block.n} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground sticky left-0 bg-card z-10 min-w-[100px]">
                metric
              </th>
              <TooltipProvider delayDuration={100}>
                {block.columns.map((col) => {
                  const info = RETURN_HORIZONS[col];
                  return (
                    <th key={col} className="px-3 py-2 text-right text-xs font-medium text-muted-foreground whitespace-nowrap">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help border-b border-dotted border-muted-foreground/30">
                            {info?.label || col}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs font-normal">
                          <code className="text-accent">{col}</code>
                          {info && <span className="ml-1 text-muted-foreground">— {info.description}</span>}
                        </TooltipContent>
                      </Tooltip>
                    </th>
                  );
                })}
              </TooltipProvider>
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
