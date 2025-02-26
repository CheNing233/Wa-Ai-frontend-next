import React, { CSSProperties, ReactNode } from "react";
import { Square, SquareCheckBig } from "lucide-react";

interface SelectionWrapperProps {
  isSelected: boolean;
  isMultiSelect: boolean;
  children: ReactNode;
}

const SelectionWrapper: React.FC<SelectionWrapperProps> = (
  {
    isSelected,
    isMultiSelect,
    children
  }
) => {

  // 虚线边框样式
  const borderStyle: CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    borderWidth: "4px",
    borderStyle: "solid",
    borderRadius: "14px",
    pointerEvents: "none", // 防止边框拦截点击
    opacity: 0.7,
    zIndex: 9999,

    background: isMultiSelect && isSelected ? "rgba(0, 0, 0, 0.3)" : ""
  };

  // 多选文字样式
  const multiSelectLabelStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999
  };

  return (
    <div className={"relative w-full h-full"}>
      {/* 子组件容器（保持正常事件处理） */}
      <div className={"relative w-full h-full"}>
        {children}
      </div>

      {/* 选中状态层 */}
      {isSelected && (
        <div className={"absolute left-0 top-0 right-0 bottom-0 pointer-events-none animate-appearance-in"}>
          {/* 虚线边框 */}
          <div
            className={"border-[var(--heroui-primary-foreground)]"}
            style={borderStyle}
          />
        </div>
      )}

      {/* 多选状态文字 */}
      {isMultiSelect && (
        <div
          className={"pointer-events-none"}
          style={multiSelectLabelStyle}
        >
          {isSelected && <SquareCheckBig size={48} />}
          {!isSelected && <Square size={48} />}
        </div>
      )}
    </div>
  );
};

export default SelectionWrapper;
