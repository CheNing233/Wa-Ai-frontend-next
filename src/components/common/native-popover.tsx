import React, { FC, MouseEvent, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import ReactDOM from "react-dom";

interface AutocompletePopoverProps {
  content: ReactNode;
  children: (
    ref: RefObject<any>,
    setOpen: (open: boolean) => void
  ) => ReactNode;
}

const NativePopover: FC<AutocompletePopoverProps> = (
  {
    children,
    content
  }
) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const outerInputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

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

    const POPOVER_HEIGHT = popoverRef.current?.clientHeight || 256; // 预设弹窗高度
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
      {children(outerInputRef, setIsPopoverOpen)}

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
            {content}
          </CardBody>
        </Card>,
        document.getElementById("root")!
      )}
    </div>
  );
};

export default NativePopover;
