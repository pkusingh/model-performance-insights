import { useState, useMemo } from "react";
import { modelBlocks, summaryRows } from "@/data/modelMetrics";
import { ModelTable } from "@/components/ModelTable";
import { SummaryTable } from "@/components/SummaryTable";
import { ReturnHorizonLegend } from "@/components/ReturnHorizonLegend";
import { parseModelName, FILTERS } from "@/lib/parseModelName";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [activeMethod, setActiveMethod] = useState<string>("ALL");

  // Group models by method (ALL vs SELECT)
  const groupedModels = useMemo(() => {
    const groups: Record<string, typeof modelBlocks> = {
      ALL: [],
      SELECT: [],
    };
    
    modelBlocks.forEach((block) => {
      const parsed = parseModelName(block.name);
      if (parsed.modelMethod === "SELECT") {
        groups.SELECT.push(block);
      } else {
        groups.ALL.push(block);
      }
    });
    
    return groups;
  }, []);

  // Get unique columns for legend
  const columns = modelBlocks[0]?.columns || [];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-foreground font-sans">
          Model Performance Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Compare regression models across filters and return horizons
        </p>
      </header>

      {/* Pipeline info */}
      <div className="mb-6 p-4 rounded-md border border-border bg-card/50">
        <div className="flex flex-wrap gap-4 text-xs">
          <div>
            <span className="text-muted-foreground">Dataset:</span>
            <Badge variant="outline" className="ml-2 font-mono">d#1</Badge>
          </div>
          <div>
            <span className="text-muted-foreground">Filters:</span>
            {Object.entries(FILTERS).slice(0, 2).map(([key, info]) => (
              <Badge key={key} variant="secondary" className="ml-2 font-mono text-[10px]">
                {info.label}
              </Badge>
            ))}
          </div>
          <div>
            <span className="text-muted-foreground">Target returns:</span>
            <Badge variant="outline" className="ml-2 font-mono text-accent">r10sm</Badge>
            <Badge variant="outline" className="ml-2 font-mono text-accent">r10log25</Badge>
          </div>
        </div>
      </div>

      {/* Return horizon legend */}
      <ReturnHorizonLegend columns={columns} />

      {/* Model method tabs */}
      <Tabs value={activeMethod} onValueChange={setActiveMethod} className="mb-6">
        <TabsList className="bg-secondary/30">
          <TabsTrigger value="ALL" className="text-xs">
            Uniform (ALL)
            <span className="ml-1.5 text-muted-foreground">
              ({groupedModels.ALL.length})
            </span>
          </TabsTrigger>
          <TabsTrigger value="SELECT" className="text-xs">
            Selected (SELECT)
            <span className="ml-1.5 text-muted-foreground">
              ({groupedModels.SELECT.length})
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Model blocks for active method */}
      <div className="space-y-6">
        {groupedModels[activeMethod]?.map((block) => (
          <ModelTable key={block.name} block={block} />
        ))}
        {groupedModels[activeMethod]?.length === 0 && (
          <p className="text-muted-foreground text-sm py-8 text-center">
            No models found for this method.
          </p>
        )}
      </div>

      {/* Summary */}
      {summaryRows.length > 0 && (
        <div className="mt-10">
          <SummaryTable rows={summaryRows} />
        </div>
      )}
    </div>
  );
};

export default Index;
