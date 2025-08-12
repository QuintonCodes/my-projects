"use client";

import { BarChart as BarChartIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MAX_PRICE, useProductFilters } from "@/hooks/use-product-filters";
import { conditionOptions } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
// import PriceRangeHistogram from "./price-range-histogram";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type FilterContentProps = ReturnType<typeof useProductFilters>;

const priceDistributionData = [
  { range: "0-1k", count: 2 },
  { range: "1k-5k", count: 5 },
  { range: "5k-10k", count: 3 },
  { range: "10k-20k", count: 2 },
  { range: "20k-50k+", count: 2 },
];

export default function FilterContent({
  form: { handleSubmit, watch, getValues, setValue },
  priceRange,
  applyFilters,
  setShowPriceDistribution,
  showPriceDistribution,
  handlePriceSliderChange,
  handleMaxPriceChange,
  handleMinPriceChange,
  resetFilters,
}: FilterContentProps) {
  const isInRange = (range: string): boolean => {
    const [min, max] = range.split("-").map(Number);
    return !(priceRange[1] < min || priceRange[0] > max);
  };

  return (
    <form onSubmit={handleSubmit(applyFilters)} className="space-y-6">
      <Accordion
        type="multiple"
        defaultValue={["price", "condition"]}
        className="w-full"
      >
        <AccordionItem value="price">
          <AccordionTrigger>
            <div className="flex items-center justify-between w-full">
              <span>Price Range</span>
              <div
                className="flex items-center h-8 px-2 text-sm rounded-md cursor-pointer text-muted-foreground hover:bg-muted/50"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPriceDistribution(!showPriceDistribution);
                }}
              >
                <BarChartIcon className="w-4 h-4 mr-1" />
                {showPriceDistribution ? "Hide" : "Show"} Distribution
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {showPriceDistribution && (
                <div className="h-[120px] w-full mb-4">
                  <ResponsiveContainer
                    width="100%"
                    height={120}
                    minWidth={100}
                    minHeight={100}
                  >
                    <BarChart
                      data={priceDistributionData}
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
                        {priceDistributionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              isInRange(entry.range) ? "#0F766E" : "#e5e7eb"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <Slider
                min={0}
                max={MAX_PRICE}
                step={100}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={handlePriceSliderChange}
                className="py-4"
                name="price-range-slider"
                id="price-range-slider"
                aria-label="Price Range Slider"
              />

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="min-price">Min</Label>
                  <Input
                    id="min-price"
                    name="min-price"
                    type="number"
                    min={0}
                    max={MAX_PRICE}
                    value={priceRange[0]}
                    onChange={handleMinPriceChange}
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="max-price">Max</Label>
                  <Input
                    id="max-price"
                    name="max-price"
                    type="number"
                    min={0}
                    max={MAX_PRICE}
                    value={priceRange[1]}
                    onChange={handleMaxPriceChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatCurrency(priceRange[0])}</span>
                <span>{formatCurrency(priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="condition">
          <AccordionTrigger>Condition</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {conditionOptions.map((option) => {
                const checked = !!watch("conditions").includes(option.value);
                return (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`condition-${option.value}`}
                      name="conditions"
                      checked={checked}
                      onCheckedChange={(checkedValue) => {
                        const currentConditions = getValues("conditions");
                        if (checkedValue) {
                          if (!currentConditions.includes(option.value)) {
                            setValue("conditions", [
                              ...currentConditions,
                              option.value,
                            ]);
                          }
                        } else {
                          setValue(
                            "conditions",
                            currentConditions.filter((c) => c !== option.value)
                          );
                        }
                      }}
                    />
                    <Label
                      htmlFor={`condition-${option.value}`}
                      className="text-sm"
                    >
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col gap-2">
        <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-800">
          Apply Filters
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={resetFilters}
          className="w-full"
        >
          Reset Filters
        </Button>
      </div>
    </form>
  );
}
