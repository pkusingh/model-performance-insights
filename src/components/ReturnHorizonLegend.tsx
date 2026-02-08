import { RETURN_HORIZONS } from "@/lib/parseModelName";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface ReturnHorizonLegendProps {
  columns: string[];
}

export function ReturnHorizonLegend({ columns }: ReturnHorizonLegendProps) {
  return (
    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
      <span className="font-medium text-foreground/70">Return horizons:</span>
      <TooltipProvider delayDuration={100}>
        {columns.map((col) => {
          const info = RETURN_HORIZONS[col];
          return (
            <Tooltip key={col}>
              <TooltipTrigger asChild>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary/50 cursor-help">
                  <code className="text-accent">{col}</code>
                  {info && <span className="text-muted-foreground/70">= {info.label}</span>}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {info?.description || col}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
