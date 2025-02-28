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
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "19px",
    borderColor: "#006FEE",
    pointerEvents: "none", // 防止边框拦截点击
    opacity: 1,
    zIndex: 1000,

    background: isMultiSelect && isSelected ? "rgba(0, 0, 0, 0.2)" : ""
  };

  return (
    <div className={"relative w-full h-full"}>
      {/* 子组件容器（保持正常事件处理） */}
      <div
        className={"relative w-full h-full"}
        style={{
          padding: isSelected ? "6px" : ""
        }}
      >
        {children}
      </div>

      {/* 选中状态层 */}
      {isSelected && (
        <div className={"absolute left-0 top-0 right-0 bottom-0 pointer-events-none"}>
          {/* 虚线边框 */}
          <div
            style={borderStyle}
          />
        </div>
      )}

      {/* 多选状态文字 */}
      {isMultiSelect && (
        <div
          className={"pointer-events-none absolute left-3 top-3 z-[9999]"}
          style={{
            backdropFilter: "blur(15px)",
          }}
        >
          {isSelected && <SquareCheckBig size={24} />}
          {!isSelected && <Square size={24} />}
        </div>
      )}
    </div>
  );
};

export default SelectionWrapper;
