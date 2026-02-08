import { cn } from "@/lib/utils";

interface MetricCellProps {
  value: number | string | null;
  metric: string;
}

function getColorClass(value: number, metric: string): string {
  if (metric === "corr") {
    if (value >= 0.25) return "text-emerald-400 bg-emerald-400/10";
    if (value >= 0.15) return "text-emerald-300/80";
    if (value >= 0.10) return "text-muted-foreground";
    return "text-red-400/80";
  }
  if (metric.startsWith("winRatio")) {
    if (value >= 0.85) return "text-emerald-400 bg-emerald-400/10";
    if (value >= 0.75) return "text-emerald-300/80";
    if (value >= 0.65) return "text-amber-400/80";
    return "text-red-400/80";
  }
  if (metric.startsWith("bias")) {
    if (value < -3) return "text-red-400 bg-red-400/10";
    if (value < 0) return "text-red-300/80";
    if (value > 5) return "text-amber-400 bg-amber-400/10";
    return "text-muted-foreground";
  }
  return "text-muted-foreground";
}

function formatValue(value: number | string | null): string {
  if (value === null || value === "None" || value === "NaN") return "—";
  if (typeof value === "string") return value;
  if (Number.isNaN(value)) return "—";
  if (Math.abs(value) >= 10) return value.toFixed(2);
  if (Math.abs(value) >= 1) return value.toFixed(2);
  return value.toFixed(4);
}

export function MetricCell({ value, metric }: MetricCellProps) {
  const formatted = formatValue(value);
  const colorClass =
    typeof value === "number" && !Number.isNaN(value)
      ? getColorClass(value, metric)
      : "text-muted-foreground/50";

  return (
    <td className={cn("px-3 py-1.5 text-right tabular-nums text-[13px] whitespace-nowrap", colorClass)}>
      {formatted}
    </td>
  );
}
