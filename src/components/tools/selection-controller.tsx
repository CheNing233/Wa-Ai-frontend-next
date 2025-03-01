// SelectionController.tsx
import React, {
  createContext,
  CSSProperties,
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef
} from "react";
import { Square, SquareCheckBig } from "lucide-react";

// 定义Context类型
type SelectionControllerContextType = {
  selectedMode: "single" | "multi";
  eventTarget: EventTarget
};

// 创建Context对象并设置默认值
const SelectionControllerContext = createContext<
  SelectionControllerContextType | undefined
>(undefined);

export interface SelectionControllerElement {
  eventTarget: EventTarget,
  clearItems: () => void,
  selectAllItems: () => void,
  getSelectedItems: (data: SelectionItemProps[]) => SelectionItemProps[]
}

// Context提供者组件
export const SelectionController = forwardRef<
  SelectionControllerElement,
  React.PropsWithChildren<{ selectedMode: "single" | "multi" }>
>(function _SelectionController({ children, selectedMode }, ref) {
  const eventTarget = useRef<EventTarget>(new EventTarget());

  const contextValue = useMemo(() => ({
    selectedMode,
    eventTarget: eventTarget.current
  }), [selectedMode]);

  const handleClear = () => {
    contextValue.eventTarget.dispatchEvent(new CustomEvent("clear"));
  };

  const handleSelectAll = () => {
    contextValue.eventTarget.dispatchEvent(new CustomEvent("selectAll"));
  };

  const getSelectedItems = (data: SelectionItemProps[]) => {
    return data.filter((item) => item.isSelected);
  };

  // 通过 ref 暴露 eventTarget
  useImperativeHandle(ref, () => ({
    eventTarget: eventTarget.current,
    clearItems: handleClear,
    selectAllItems: handleSelectAll,
    getSelectedItems: getSelectedItems
  }), [contextValue.eventTarget]);

  return (
    <SelectionControllerContext.Provider value={contextValue}>
      {children}
    </SelectionControllerContext.Provider>
  );
});

export interface SelectionItemProps {
  [key: string]: any,

  id: string;
  renderPosition?: number;
  isSelected?: boolean;
  lastSelected?: boolean;
}


// 自定义hook用于子组件消费context
export const useSelectionController = (
  item: SelectionItemProps,
  data: SelectionItemProps[],
  updateItem: (newItemState: Partial<SelectionItemProps>) => void,
  updateItemFunc: (findFn: (item: SelectionItemProps) => boolean, newItemState: Partial<SelectionItemProps>) => void
) => {
  const context = useContext(SelectionControllerContext);

  if (!context) {
    throw new Error(
      "[useSelectionController] must be used within a SelectionController"
    );
  }

  useEffect(() => {
    if (context.selectedMode === "single") {
      // 多选切回单选，恢复最后一次选中项
      if (item.lastSelected) {
        handleSingleSelect(item);
      }
    }
  }, [context.selectedMode]);

  useEffect(() => {
    context.eventTarget.addEventListener("clear", handleClear);
    context.eventTarget.addEventListener("selectAll", handleSelectAll);

    return () => {
      context.eventTarget.removeEventListener("clear", handleClear);
      context.eventTarget.removeEventListener("selectAll", handleSelectAll);
    };
  }, []);

  const handleClear = () => {
    updateItemFunc(() => true, { isSelected: false });
  };

  const handleSelectAll = () => {
    updateItemFunc(() => true, { isSelected: true });
  };

  const handleSingleSelect = (target: SelectionItemProps = item) => {
    updateItem({
      isSelected: true, lastSelected: true
    });
    updateItemFunc((i) => i.id !== target.id, {
      isSelected: false, lastSelected: false
    });
  };

  const handleMultiSelect = () => {
    updateItem({
      isSelected: !item?.isSelected, lastSelected: true
    });
    updateItemFunc((i) => i.id !== item.id, {
      lastSelected: false
    });
  };

  const handleClick = () => {
    if (context.selectedMode === "single") {
      handleSingleSelect();
    } else {
      handleMultiSelect();
    }
    context.eventTarget.dispatchEvent(new CustomEvent("selectionChange", { detail: item }));
  };

  return {
    isMultiSelect: context.selectedMode === "multi",
    click: handleClick
  };
};

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
            backdropFilter: "blur(15px)"
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
