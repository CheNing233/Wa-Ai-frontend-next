import { useCallback, useEffect, useState } from "react";
import { Card, CardBody, Chip, Listbox, ListboxItem, Slider } from "@heroui/react";
import { ChevronsLeftRightEllipsis } from "lucide-react";

import { debounce } from "@/utils/flow-control.ts";

type AutocompleteHelperProps = {
  // 显示控制
  type: "number" | "string";
  showSlider?: boolean;
  showDrag?: boolean;
  showRecommendations?: boolean;
  showOptions?: boolean;

  // 限制值
  min?: number;
  max?: number;
  step?: number;

  // 列表数据
  recommendations?: Array<number | string>;
  options?: Array<number | string>;

  // 统一的值控制
  value: number | string;
  syncValue?: number | string;
  onValueChange: (value: number | string) => void;
};

const Title = (
  { title }: { title: string }
) => {
  return (
    <div className="flex flex-row gap-2">
      <span className="flex-1 text-xs font-bold block">{title}</span>
    </div>
  );
};

const AutocompleteHelper = (
  {
    type,
    showSlider = true,
    showDrag = true,
    showRecommendations = true,
    showOptions = true,
    recommendations = [],
    options = [],
    ...props
  }: AutocompleteHelperProps
) => {
  const [tempValue, setTempValue] = useState<number | string>(props.value);

  const updateRealValue = debounce((value: number | string) => {
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

  const handleStringChange = useCallback((value: string) => {
    setTempValue(value);
    updateRealValue(value);
  }, [updateRealValue]);

  const handleDrag = useCallback((e: any) => {
    const startX = e.clientX;
    const startValue = Number(props.value || tempValue);

    // 辅助函数：计算步进精度
    const getPrecision = (step: number) => {
      const stepString = step.toString();
      const decimalIndex = stepString.indexOf(".");

      return decimalIndex === -1 ? 0 : stepString.length - decimalIndex - 1;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const diff = event.clientX - startX;

      if (diff === 0) return;

      // 获取步进精度
      const step = props.step || 1; // 默认步进 1
      const precision = getPrecision(step);

      // 速率（20px 对应 1 个步进单位）
      const stepValue = Math.round(diff / 20) * step;
      const newValue = Number(
        (startValue + stepValue).toFixed(precision)
      );

      if (!isNaN(newValue)) {
        handleChange(newValue);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [props, handleChange]);


  return (
    <div className={"w-full h-full flex flex-col gap-2"}>
      <Card>
        <CardBody className={"pt-1.5 px-2 overflow-visible"}>
          <span className={"text-xs font-bold truncate"}>
            <span className={"opacity-50 select-none"}>当前:</span> {tempValue}
          </span>
        </CardBody>
      </Card>
      <div className={"w-full h-full relative overflow-y-scroll overflow-x-hidden"}>

        <div className="flex flex-col gap-3 p-2 w-full h-full">

          {/*数字调控部分*/}
          {(showSlider && type === "number") && (
            <div className={"flex-1 flex flex-col gap-2 w-full"}>
              <Title title={"调节"} />

              <div className={"flex flex-row flex-nowrap gap-2 w-full items-center"}>
                {/* 滑块部分 */}
                <div className={"flex-1"}>
                  <Slider
                    maxValue={props.max}
                    minValue={props.min}
                    size={"sm"}
                    step={props.step}
                    value={tempValue as number}
                    onChange={handleChange as any}
                  />
                </div>

                {/* 拖拽微调 */}
                {showDrag && (
                  <div className={"shrink flex flex-col gap-2 cursor-ew-resize"}>
                    <Chip
                      className="select-none"
                      size={"sm"}
                      onMouseDown={handleDrag}
                    >
                      <div className={"w-full flex justify-center items-center"}>
                        <ChevronsLeftRightEllipsis size={24} />
                      </div>
                    </Chip>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 推荐值列表 */}
          {showRecommendations && recommendations.length > 0 && (
            <div className={"flex flex-col gap-2"}>
              <Title title={"推荐值"} />
              <Listbox
                aria-label="推荐值"
                classNames={{ base: "p-0" }}
                selectedKeys={[String(props.value)]}
                selectionMode="single"
                onSelectionChange={(keys) => {
                  if (type === "number") {
                    const value = Number(Array.from(keys)[0]);

                    if (!isNaN(value)) handleChange(value);
                  } else {
                    const value = Array.from(keys)[0];

                    if (value) handleStringChange(String(value));
                  }
                }}
              >
                {recommendations.map((value) => (
                  <ListboxItem key={String(value)}>
                    {`${value}`}
                  </ListboxItem>
                ))}
              </Listbox>
            </div>
          )}

          {/* 可选值列表 */}
          {showOptions && options.length > 0 && (
            <div className={"flex flex-col gap-2"}>
              <Title title={"可选值"} />
              <Listbox
                aria-label="可选值"
                classNames={{ base: "p-0" }}
                selectedKeys={[String(props.value)]}
                selectionMode="single"
                onSelectionChange={(keys) => {
                  if (type === "number") {
                    const value = Number(Array.from(keys)[0]);

                    if (!isNaN(value)) handleChange(value);
                  } else {
                    const value = Array.from(keys)[0];

                    if (value) handleStringChange(String(value));
                  }
                }}
              >
                {options.map((value) => (
                  <ListboxItem key={String(value)}>
                    {`${value}`}
                  </ListboxItem>
                ))}
              </Listbox>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default AutocompleteHelper;
