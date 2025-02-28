import React, { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import ReactDOM from "react-dom";
import { Input } from "@heroui/input";

import { useParamFormsVM } from "@/controller/useParamFormsVM.tsx";
import AutocompleteHelper from "@/components/workbench/common/autocomplete-helper.tsx";

const AutocompletePopover: FC<any> = ({ config }: any) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const outerInputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { getCurrentFormItem, updateCurrentFormItem } = useParamFormsVM();

  const [innerValue, setInnerValue] = useState(getCurrentFormItem(config.target));


  // 点击外部关闭逻辑
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;

      if (
        popoverRef.current &&
        outerInputRef.current &&
        !popoverRef.current.contains(target) &&
        !outerInputRef.current.contains(target)
      ) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPopoverStyle = (): any => {
    if (!outerInputRef.current) return {};

    const POPOVER_HEIGHT = 256; // 预设弹窗高度
    const MARGIN = 12; // 安全边距
    const rect = outerInputRef.current.getBoundingClientRect();

    // 计算可用空间
    const spaceBelow = window.innerHeight - rect.bottom - MARGIN;
    const spaceAbove = rect.top - MARGIN;

    // 触底检测逻辑
    const shouldShowAbove = spaceBelow < POPOVER_HEIGHT && spaceAbove > POPOVER_HEIGHT;

    return {
      top: shouldShowAbove
        ? rect.top - POPOVER_HEIGHT - MARGIN
        : rect.bottom + MARGIN,
      left: rect.left - 8,
      width: rect.width + 16
    };
  };

  const handlePopoverMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={"relative"}>
      <Input
        ref={outerInputRef}
        readOnly={false}
        size={"sm"}
        value={getCurrentFormItem(config.target)}
        onFocus={() => setIsPopoverOpen(true)}
        onValueChange={(value: any) => {
          updateCurrentFormItem(config.target, value);
          setInnerValue(value);
        }}
      />

      {isPopoverOpen && ReactDOM.createPortal(
        <Card
          ref={popoverRef}
          className={"absolute min-w-48 h-64"}
          style={{
            ...getPopoverStyle()
          }}
          onMouseDown={handlePopoverMouseDown}
        >
          <CardBody>
            <AutocompleteHelper
              showDrag
              showOptions
              showRecommendations
              showSlider

              max={100}
              min={0}

              options={[10, 30, 70, 100]}
              recommendations={[20, 50, 80]}
              step={5}

              syncValue={innerValue}
              value={getCurrentFormItem(config.target)}
              onValueChange={(value: any) => {
                updateCurrentFormItem(config.target, value);
              }}
            />
          </CardBody>
        </Card>,
        document.getElementById("root")!
      )}
    </div>
  );
};

export default AutocompletePopover;
