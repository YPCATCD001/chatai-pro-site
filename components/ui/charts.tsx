"use client";

interface MiniLineChartProps {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
}

export function MiniLineChart({ data, color = "#8b5cf6", height = 60, className = "" }: MiniLineChartProps) {
  if (data.length === 0) return null;

  const width = 200;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;
  const gradientId = `grad-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full ${className}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface MiniBarChartProps {
  data: number[];
  color?: string;
  height?: number;
  labels?: string[];
  className?: string;
}

export function MiniBarChart({ data, color = "#8b5cf6", height = 80, labels, className = "" }: MiniBarChartProps) {
  if (data.length === 0) return null;

  const max = Math.max(...data, 1);
  const barWidth = 100 / data.length;

  return (
    <div className={`w-full flex items-end gap-1 ${className}`} style={{ height }}>
      {data.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md transition-all duration-500"
            style={{
              height: `${(val / max) * 100}%`,
              minHeight: "4px",
              background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`,
            }}
          />
          {labels && labels[i] && (
            <span className="text-[10px] text-muted-foreground">{labels[i]}</span>
          )}
        </div>
      ))}
    </div>
  );
}

interface DonutChartProps {
  value: number;
  max: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function DonutChart({
  value,
  max,
  color = "#8b5cf6",
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  className = "",
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((value / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="text-2xl font-bold">{label}</span>}
        {sublabel && <span className="text-xs text-muted-foreground mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
}
