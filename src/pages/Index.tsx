import { useState } from "react";
import { modelBlocks, summaryRows } from "@/data/modelMetrics";
import { ModelTable } from "@/components/ModelTable";
import { SummaryTable } from "@/components/SummaryTable";

const filters = ["SYMBOLCOUNT_10000", "UNFILTERED"] as const;
type Filter = typeof filters[number];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("SYMBOLCOUNT_10000");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground font-sans">
          Model Comparison
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pipeline metrics · row: model · n=162
        </p>
      </header>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 border-b border-border pb-0">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 text-xs font-medium transition-colors border-b-2 -mb-px ${
              activeFilter === f
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Model blocks */}
      <div className="space-y-6">
        {modelBlocks.map((block) => (
          <ModelTable key={block.name} block={block} />
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10">
        <SummaryTable rows={summaryRows} />
      </div>
    </div>
  );
};

export default Index;
