import { useCallback, useEffect, useState } from "react";
import { Slider } from "@heroui/slider";
import { ChevronsLeftRightEllipsis } from "lucide-react";
import { Chip } from "@heroui/chip";
import { Listbox, ListboxItem } from "@heroui/listbox";

import { debounce } from "@/utils/flow-control.ts";

type AutocompleteHelperProps = {
  children?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";

  // 显示控制
  show?: boolean;
  showSlider?: boolean;
  showDrag?: boolean;
  showRecommendations?: boolean;
  showOptions?: boolean;

  // 限制值
  min?: number;
  max?: number;
  step?: number;

  // 列表数据
  recommendations?: number[];
  options?: number[];

  // 统一的值控制
  value: number;
  syncValue?: number;
  onValueChange: (value: number) => void;
};

const Title = (
  { title, value }: { title: string, value: number }
) => {
  return (
    <div className="flex flex-row gap-2">
      <span className="flex-1 text-xs font-bold block">{title}</span>
      <span className="flex-none text-xs font-bold block truncate max-w-[50%]">当前: {value}</span>
    </div>
  );
};

const AutocompleteHelper = (
  {
    children = null,
    placement = "top",
    show = undefined,
    showSlider = true,
    showDrag = true,
    showRecommendations = true,
    showOptions = true,
    recommendations = [],
    options = [],
    ...props
  }: AutocompleteHelperProps
) => {
  const [tempValue, setTempValue] = useState(props.value);

  const updateRealValue = debounce((value: number) => {
    props.onValueChange?.(value);
  }, 100);

  useEffect(() => {
    if (props.value === tempValue || !props.syncValue) return;
    setTempValue(props.syncValue);
  }, [props.syncValue]);

  // 统一值处理
  const handleChange = useCallback((newValue: number) => {
    const clampedValue = Math.min(
      Math.max(newValue, props.min ?? 0),
      props.max ?? 100
    );

    setTempValue(clampedValue);
    updateRealValue(clampedValue);
  }, [props]);

  const handleDrag = useCallback((e: any) => {
    const startX = e.clientX;
    const startValue = tempValue;

    const handleMouseMove = (event: MouseEvent) => {
      const diff = event.clientX - startX;
      const newValue = Math.round((startValue + (diff / 2000)) * 100) / 100;

      handleChange(newValue);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [props, handleChange]);

  // const Content = () => {
  //   return (
  //
  //   );
  // };

  // if (children) {
  //   return (
  //     // eslint-disable-next-line jsx-a11y/no-autofocus
  //     <Popover autoFocus={false} isOpen={show} placement={placement} tabIndex={-1}>
  //       <PopoverTrigger>{children}</PopoverTrigger>
  //
  //       <PopoverContent className="max-h-64 w-64">
  //         <Content />
  //       </PopoverContent>
  //     </Popover>
  //   );
  // } else {
  //   return <Content />;
  // }

  return (
    <div className={"w-full h-full overflow-y-scroll overflow-x-hidden"}>
      <div className="flex flex-col gap-3 p-2 w-full h-full">

        {/* 滑块部分 */}
        {showSlider && (
          <div className={"flex flex-col gap-2"}>
            <Title title={"调节"} value={tempValue} />
            <Slider
              maxValue={props.max}
              minValue={props.min}
              size={"sm"}
              step={props.step}
              value={tempValue}
              onChange={handleChange as any}
            />
          </div>
        )}

        {/* 拖拽微调 */}
        {showDrag && (
          <div className={"flex flex-col gap-2 w-full cursor-ew-resize"}>
            <Title title={"拖拽微调"} value={tempValue} />
            <Chip
              className="max-w-full select-none"
              onMouseDown={handleDrag}
            >
              <div className={"w-full flex justify-center items-center"}>
                <ChevronsLeftRightEllipsis size={24} />
              </div>
            </Chip>
          </div>
        )}

        {/* 推荐值列表 */}
        {showRecommendations && recommendations.length > 0 && (
          <div className={"flex flex-col gap-2"}>
            <Title title={"推荐值"} value={tempValue} />
            <Listbox
              aria-label="推荐值"
              classNames={{ base: "p-0" }}
              selectedKeys={props.value ? [String(props.value)] : []}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const value = Number(Array.from(keys)[0]);

                if (!isNaN(value)) handleChange(value);
              }}
            >
              {recommendations.map((value) => (
                <ListboxItem key={String(value)}>
                  {value}
                </ListboxItem>
              ))}
            </Listbox>
          </div>
        )}

        {/* 可选值列表 */}
        {showOptions && options.length > 0 && (
          <div className={"flex flex-col gap-2"}>
            <Title title={"可选值"} value={tempValue} />
            <Listbox
              aria-label="可选值"
              classNames={{ base: "p-0" }}
              selectedKeys={props.value ? [String(props.value)] : []}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const value = Number(Array.from(keys)[0]);

                if (!isNaN(value)) handleChange(value);
              }}
            >
              {options.map((value) => (
                <ListboxItem key={String(value)}>
                  {value}
                </ListboxItem>
              ))}
            </Listbox>
          </div>
        )}
      </div>
    </div>
  );
};


export default AutocompleteHelper;
