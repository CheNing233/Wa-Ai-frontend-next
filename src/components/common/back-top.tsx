import { ArrowUpToLine } from "lucide-react";
import { Button } from "@heroui/react";
import { RefObject } from "react";

export type scrollElement = HTMLDivElement | string | RefObject<HTMLDivElement>;

interface BackTopProps {
  scrollContainer: scrollElement;
}

export default function BackTop(
  {
    scrollContainer
  }: BackTopProps
) {
  const handleBackTop = () => {
    let content: HTMLDivElement | null = null;

    // 处理不同类型的 scrollContainer
    if (typeof scrollContainer === "string") {
      // 字符串类型时使用选择器获取元素
      content = document.querySelector(scrollContainer) as HTMLDivElement;
    } else if (scrollContainer && "current" in scrollContainer) {
      // RefObject 类型时获取 current
      content = scrollContainer.current;
    } else {
      if (scrollContainer) {
        content = scrollContainer;
      }
    }

    if (content) {
      content.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <Button
      className={"absolute right-4 bottom-4 z-10"}
      isIconOnly={true}
      onPress={handleBackTop}
    >
      <ArrowUpToLine size={20} />
    </Button>
  );
}
