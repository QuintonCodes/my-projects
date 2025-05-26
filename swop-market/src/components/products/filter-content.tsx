"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MAX_PRICE, useProductFilters } from "@/hooks/use-product-filters";
import { conditionOptions, priceDistributionData } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";
import { BarChart } from "lucide-react";
import PriceRangeHistogram from "../price-range-histogram";
import { Checkbox } from "../ui/checkbox";

export default function FilterContent() {
  const {
    form,
    priceRange,
    applyFilters,
    setShowPriceDistribution,
    showPriceDistribution,
    handlePriceSliderChange,
    handleMaxPriceChange,
    handleMinPriceChange,
    resetFilters,
  } = useProductFilters();

  return (
    <form onSubmit={form.handleSubmit(applyFilters)} className="space-y-6">
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
                <BarChart className="w-4 h-4 mr-1" />
                {showPriceDistribution ? "Hide" : "Show"} Distribution
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {showPriceDistribution && (
                <div className="mb-4">
                  <PriceRangeHistogram
                    data={priceDistributionData}
                    selectedRange={priceRange}
                  />
                </div>
              )}

              <Slider
                min={0}
                max={MAX_PRICE}
                step={100}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={handlePriceSliderChange}
                className="py-4"
              />

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="min-price">Min</Label>
                  <Input
                    id="min-price"
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
              {conditionOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condition-${option.id}`}
                    checked={form.watch("conditions").includes(option.id)}
                    onCheckedChange={(checked) => {
                      const currentConditions = form.getValues("conditions");
                      if (checked) {
                        form.setValue("conditions", [
                          ...currentConditions,
                          option.id,
                        ]);
                      } else {
                        form.setValue(
                          "conditions",
                          currentConditions.filter((c) => c !== option.id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={`condition-${option.id}`} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
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
