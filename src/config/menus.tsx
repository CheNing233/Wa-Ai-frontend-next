import { ReactNode } from "react";
import { HomeIcon, ListStartIcon, MonitorDotIcon, NewspaperIcon, SignpostIcon, TagIcon, User2Icon } from "lucide-react";

interface menuItem {
  label: string;
  href: string;
}

export interface headerMenuItem extends menuItem {
  banner?: {
    value: string;
    color: any;
  }[];
}

export type headerMenu = Record<string, headerMenuItem[]>;

export const headerMenuConfig: headerMenu = {
  main: [
    {
      label: "绘图",
      href: "/paint",
      banner: [
        {
          value: "SDWebUI",
          color: "yellow"
        },
        {
          value: "ComfyUI",
          color: "pink"
        }
      ]
    },
    {
      label: "对话",
      href: "/chat",
      banner: [
        {
          value: "DeepSeek",
          color: "blue"
        }
      ]
    }
  ]
};

interface sidebarItem extends menuItem {
  description?: string;
  icon?: ReactNode;
}

export interface sidebarSection {
  label: string;
  items: sidebarItem[];
}

export type sidebarMenu = Record<string, sidebarSection[]>

const iconClasses = "w-4 h-4 text-default-500 pointer-events-none flex-shrink-0";

export const sidebarMenuConfig: sidebarMenu = {
  paint: [
    {
      label: "探索",
      items: [
        {
          label: "主页",
          href: "/paint/home", // 根据你的路由结构需要调整
          description: "求你了，来测",
          icon: <HomeIcon className={iconClasses} />
        },
        {
          label: "帖子",
          href: "/paint/posts",
          description: "发布你的魔法作品",
          icon: <SignpostIcon className={iconClasses} />
        },
        {
          label: "模型",
          href: "/paint/models",
          description: "SD1.5 SDXL IL Noob",
          icon: <MonitorDotIcon className={iconClasses} />
        },
        {
          label: "提示词",
          href: "/paint/tags",
          description: "Danbooru Tag",
          icon: <TagIcon className={iconClasses} />
        },
        {
          label: "画师",
          href: "/paint/artists",
          description: "Danbooru Artists",
          icon: <User2Icon className={iconClasses} />
        }
      ]
    },
    {
      label: "创作",
      items: [
        {
          label: "快速开始",
          href: "/paint/quick-start",
          description: "新手推荐，无需部署",
          icon: <ListStartIcon className={iconClasses} />
        },
        {
          label: "标准工作台",
          href: "/paint/standard",
          description: "A1111标准SDWebUI",
          icon: <NewspaperIcon className={iconClasses} />
        },
        {
          label: "工作流",
          href: "/paint/workflow",
          description: "ComfyUI工作台",
          icon: <NewspaperIcon className={iconClasses} />
        },
        {
          label: "训练LoRa",
          href: "/paint/train-lora",
          description: "自动运行",
          icon: <NewspaperIcon className={iconClasses} />
        }
      ]
    }
  ]
};
