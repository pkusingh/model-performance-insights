import { parseModelName, MODEL_METHODS, FILTERS } from "@/lib/parseModelName";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ModelHeaderProps {
  name: string;
  n: number;
}

export function ModelHeader({ name, n }: ModelHeaderProps) {
  const parsed = parseModelName(name);
  const methodInfo = MODEL_METHODS[parsed.modelMethod];
  const filterInfo = FILTERS[parsed.filter];

  return (
    <TooltipProvider delayDuration={100}>
      <div className="px-4 py-2.5 border-b border-border flex items-center gap-3 flex-wrap">
        {/* Model method badge */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant={parsed.modelMethod === "SELECT" ? "default" : "secondary"}
              className="font-mono text-[10px] cursor-help"
            >
              {methodInfo?.label || parsed.modelMethod || "Model"}
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            <div className="font-medium">{parsed.modelType}</div>
            {methodInfo && <div className="text-muted-foreground">{methodInfo.description}</div>}
          </TooltipContent>
        </Tooltip>

        {/* Filter badge */}
        {parsed.filter && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="font-mono text-[10px] cursor-help">
                {filterInfo?.label || parsed.filter}
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <div className="font-medium">{parsed.filter}</div>
              {filterInfo && <div className="text-muted-foreground">{filterInfo.description}</div>}
            </TooltipContent>
          </Tooltip>
        )}

        {/* Target return badge */}
        {parsed.targetReturn && (
          <Badge variant="outline" className="font-mono text-[10px] text-accent border-accent/30">
            target: {parsed.targetReturn}
          </Badge>
        )}

        {/* Dataset badge */}
        <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
          {parsed.dataId}
        </Badge>

        {/* Sample count */}
        <span className="text-xs text-muted-foreground ml-auto shrink-0">
          n={n.toLocaleString()}
        </span>
      </div>
    </TooltipProvider>
  );
}
