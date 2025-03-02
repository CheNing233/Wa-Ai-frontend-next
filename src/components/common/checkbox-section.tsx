import { Button, CheckboxGroup, Chip, useCheckbox } from "@heroui/react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { CheckCircle, Circle, RotateCcw } from "lucide-react";
import { useState } from "react";

interface checkboxItem {
  key: string;
  label: string;
}

interface checkboxSection {
  sectionTitle: string;
  items: checkboxItem[];
}

interface CheckboxSectionProps {
  sections: checkboxSection[];
  selected?: string[];
  onSelectedChange?: (selected: string[]) => void;
}


const CustomCheckbox = (props: any) => {
  const { children, isSelected, getBaseProps, getLabelProps, getInputProps } =
    useCheckbox({
      ...props
    });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        className={"duration-200"}
        color={isSelected ? "success" : "default"}
        size={"sm"}
        startContent={isSelected
          ? <CheckCircle className={"mr-1"} size={16} />
          : <Circle className={"mr-1"} size={16} />
        }
        variant={isSelected ? "shadow" : "solid"}
        {...getLabelProps() as any}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};


export default function CheckboxSection(
  {
    sections,
    selected,
    onSelectedChange
  }: CheckboxSectionProps
) {
  const [innerSelected, setInnerSelected] = useState<string[]>([]);

  const _selected = selected ?? innerSelected;
  const _setSelected = onSelectedChange ?? setInnerSelected;

  return (
    <div className={`flex flex-col gap-4 w-full`}>
      {
        sections.map((section) => (
          <CheckboxGroup
            key={section.sectionTitle}
            className="gap-1 flex-wrap"
            label={<div className={"pb-1.5 text-foreground font-bold"}>{section.sectionTitle}</div>}
            orientation="horizontal"
            value={_selected}
            onChange={_setSelected}
          >
            {
              section.items.map((item) => (
                <CustomCheckbox key={item.key} value={item.key}>
                  {item.label}
                </CustomCheckbox>
              ))
            }
          </CheckboxGroup>
        ))
      }
      <Button
        startContent={<RotateCcw size={20} />}
        onPress={() => _setSelected([])}
      >
        重置所有
      </Button>
    </div>
  );
}
