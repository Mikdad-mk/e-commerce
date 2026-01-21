"use client";

import { ChevronDown, LayoutGrid, List, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const filters = [
  { label: "Categories", options: ["All", "Kitchen", "Living Room", "Bedroom", "Bathroom", "Decor"] },
  { label: "Color", options: ["All", "White", "Beige", "Brown", "Grey", "Black"] },
  { label: "Price", options: ["All", "Under $25", "$25 - $50", "$50 - $100", "Over $100"] },
  { label: "Brand", options: ["All", "Avenzo", "Artisan Co.", "Natural Living", "Home Basics"] },
];

export const FilterBar = () => {
  return (
    <div className="border-b border-border bg-background">
      <div className="container py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Filter by
            </span>
            {filters.map((filter) => (
              <DropdownMenu key={filter.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="filter-button h-auto py-1.5 px-2">
                    {filter.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[140px]">
                  {filter.options.map((option) => (
                    <DropdownMenuItem key={option} className="cursor-pointer">
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {/* Sort & View */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="filter-button h-auto py-1.5 px-2">
                  Default Sorting
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Default Sorting</DropdownMenuItem>
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Newest First</DropdownMenuItem>
                <DropdownMenuItem>Best Selling</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-1 border-l border-border pl-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
