"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface PriceRangeHistogramProps {
  data: Array<{ range: string; count: number }>;
  selectedRange: [number, number];
}

export default function PriceRangeHistogram({
  data,
  selectedRange,
}: PriceRangeHistogramProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to determine if a bar is within the selected range
  const isInRange = (range: string): boolean => {
    const [min, max] = range.split("-").map(Number);
    return !(selectedRange[1] < min || selectedRange[0] > max);
  };

  if (!isClient) {
    return (
      <div className="h-[120px] w-full bg-muted/30 rounded-md flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading price distribution...
        </p>
      </div>
    );
  }

  return (
    <div className="h-[120px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
        >
          <XAxis
            dataKey="range"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis hide />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={isInRange(entry.range) ? "#0F766E" : "#e5e7eb"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
