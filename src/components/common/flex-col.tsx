import { Children, HTMLAttributes, useEffect, useRef, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl"

// 默认断点配置（Tailwind标准断点）
const defaultBreakpoints: Record<Breakpoint, number> = {
  xs: 0,     // 0px
  sm: 640,   // 640px
  md: 768,   // 768px
  lg: 1024,  // 1024px
  xl: 1280,  // 1280px
  xxl: 1536, // 1536px
  xxxl: 1920 // 1920px
};

export function getColumnCount(params: {
  cols: Partial<Record<Breakpoint, number>>;
  currentWidth: number;
  fallback?: number;
  breakpoints?: Partial<Record<Breakpoint, number>>;
}): number {
  const { cols, currentWidth, breakpoints } = params;

  // 合并自定义断点配置
  const mergedBreakpoints = {
    ...defaultBreakpoints,
    ...breakpoints
  };

  // 按断点尺寸从大到小排序
  const orderedBreakpoints: Breakpoint[] = [
    "xxxl", "xxl", "xl", "lg", "md", "sm", "xs"
  ];

  // 按顺序检查每个断点
  for (const bp of orderedBreakpoints) {
    const breakpointWidth = mergedBreakpoints[bp];

    // 当前宽度满足断点要求且存在对应列数配置
    if (currentWidth >= breakpointWidth && cols[bp] !== undefined) {
      return cols[bp]!;
    }
  }

  // 没有找到任何有效配置时返回undefined
  return params.fallback ?? 1;
}

interface FlexColProps extends HTMLAttributes<HTMLDivElement> {
  cols?: Partial<Record<Breakpoint, number>>;
  gapX?: number;
  gapY?: number;
  children: React.ReactNode;

  [key: string]: any;
}

const FlexCol = (
  {
    cols = { xs: 1 },
    gapX = 0,
    gapY = 0,
    children,
    ...otherProps
  }: FlexColProps
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentColumnCount, setCurrentColumnCount] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const currentWidth = containerRef.current.clientWidth;
        const columnCount = getColumnCount({
          cols,
          currentWidth
        });

        setCurrentColumnCount(columnCount);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [cols, setCurrentColumnCount, containerRef]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "row" as const,
        flexWrap: "wrap" as const,
        gap: `${gapY}rem ${gapX}rem`
      }}
      {...otherProps}
    >
      {Children.map(children, (child) => (
        <div
          style={{
            flexBasis:
              `calc(
              ${100 / currentColumnCount}% - 
              ${gapX}rem * ${currentColumnCount - 1} / 
              ${currentColumnCount})`
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default FlexCol;
