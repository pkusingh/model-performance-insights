/**
 * Parse model block names into structured components
 * Format: {modelType}_{filter}_{returnId}_{dataId}
 * Example: steps25_ALL_SYMBOLCOUNT_10000_r10log25_d#1
 */

export interface ParsedModelName {
  modelType: string;        // e.g., "steps25_ALL", "steps25_SELECT"
  modelMethod: string;      // e.g., "ALL" (uniform), "SELECT" (xorOls)
  filter: string;           // e.g., "SYMBOLCOUNT_10000", "UNFILTERED"
  targetReturn: string;     // e.g., "r10log25", "r10sm"
  dataId: string;           // e.g., "d#1"
  raw: string;
}

export function parseModelName(name: string): ParsedModelName {
  const raw = name;
  
  // Try to parse: steps25_ALL_SYMBOLCOUNT_10000_r10log25_d#1
  const dataIdMatch = name.match(/_d#(\d+)$/);
  const dataId = dataIdMatch ? `d#${dataIdMatch[1]}` : "d#1";
  if (dataIdMatch) {
    name = name.replace(/_d#\d+$/, '');
  }
  
  // Extract return ID (r10log25, r10sm, r1sm, etc.)
  const returnMatch = name.match(/_(r\d+(?:sm|log\d+|F)?)$/i);
  const targetReturn = returnMatch ? returnMatch[1] : "";
  if (returnMatch) {
    name = name.replace(/_(r\d+(?:sm|log\d+|F)?)$/i, '');
  }
  
  // Extract filter (SYMBOLCOUNT_10000, UNFILTERED)
  let filter = "";
  if (name.includes("_SYMBOLCOUNT_")) {
    const filterMatch = name.match(/_(SYMBOLCOUNT_\d+)/);
    filter = filterMatch ? filterMatch[1] : "";
    name = name.replace(/_SYMBOLCOUNT_\d+/, '');
  } else if (name.includes("_UNFILTERED")) {
    filter = "UNFILTERED";
    name = name.replace(/_UNFILTERED/, '');
  }
  
  // Remaining is model type (steps25_ALL, steps25_SELECT)
  const modelType = name;
  const methodMatch = modelType.match(/_(ALL|SELECT)$/);
  const modelMethod = methodMatch ? methodMatch[1] : "";
  
  return {
    modelType,
    modelMethod,
    filter,
    targetReturn,
    dataId,
    raw
  };
}

export const RETURN_HORIZONS: Record<string, { label: string; description: string }> = {
  "r1F": { label: "Next Tick", description: "Next tick return" },
  "r250": { label: "250μs", description: "250 microsecond return" },
  "r1sm": { label: "1s", description: "1 second return" },
  "r5sm": { label: "5s", description: "5 second return" },
  "r10sm": { label: "10s", description: "10 second return" },
  "r30sm": { label: "30s", description: "30 second return" },
  "r60sm": { label: "60s", description: "60 second return" },
  "r120sm": { label: "120s", description: "120 second return" },
  "r10log25": { label: "10s log", description: "10 second return with log transform (25bps)" },
  "r1log10": { label: "1s log", description: "1 second return with log transform (10bps)" },
};

export const MODEL_METHODS: Record<string, { label: string; description: string }> = {
  "ALL": { label: "Uniform", description: "NNLS + uniform weighting" },
  "SELECT": { label: "Selected", description: "NNLS + xorOls feature selection" },
};

export const FILTERS: Record<string, { label: string; description: string }> = {
  "SYMBOLCOUNT_10000": { label: "High Volume", description: "Top 10,000 samples by symbol count" },
  "UNFILTERED": { label: "All Data", description: "No filtering applied" },
  "SYMBOLS__ALL": { label: "Per-Symbol", description: "Aggregated per-symbol metrics" },
};
