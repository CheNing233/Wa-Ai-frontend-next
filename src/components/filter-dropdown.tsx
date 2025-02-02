import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Button } from "@heroui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

import CheckboxSection from "@/components/ui/checkbox-section.tsx";
import { filterSection } from "@/config/filters.tsx";

interface FilterDropdownProps {
  filterSets: filterSection[];
}

export const FilterDropdown = (
  {
    filterSets
  }: FilterDropdownProps
) => {
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState<string[]>([]);

  return (
    <Popover
      isOpen={open}
      placement={"bottom-end"}
      onOpenChange={setOpen}
    >
      <PopoverTrigger>
        <Button
          color={filters.length === 0 ? "default" : "success"}
          size={"lg"}
          variant={filters.length === 0 ? "solid" : "shadow"}
        >
          <div className={"absolute w-full h-full py-1.5 px-3"}>
            <div className={"flex flex-row flex-nowrap items-center"}>
              <div className={"flex-grow flex flex-col items-start justify-start w-full h-full"}>
                <span className={"text-xs text-default-600"}>筛选</span>
                <span className={"text-sm text-default-foreground"}>
                  {filters.length === 0
                    ? "未选择"
                    : `已选${filters.length}个`
                  }
                </span>
              </div>
              <div className={"flex-shrink"}>
                {open
                  ? <ChevronUp size={16} />
                  : <ChevronDown size={16} />
                }
              </div>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"p-4 max-w-sm"}>
        <CheckboxSection
          sections={filterSets}
          selected={filters}
          onSelectedChange={setFilters}
        />
      </PopoverContent>
    </Popover>
  );
};
