import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox";
import { Divider } from "@heroui/divider";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MousePointer } from "lucide-react";
import { Button } from "@heroui/button";
import { Drawer, DrawerContent } from "@heroui/drawer";

import { sidebarSection } from "@/config/menus.tsx";
import { useIsMobile } from "@/hooks/use-mobile.tsx";
import BackTop from "@/components/back-top.tsx";

/**
 * SidebarContext 上下文
 */

type SidebarContextProps = {
  open: boolean
  setOpen: (open: boolean) => void,
  mobileOpen: boolean,
  setMobileOpen: (open: boolean) => void,
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}


export function SidebarProvider(
  {
    children
  }: {
    children: ReactNode;
  }
) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const context = useMemo(
    () => ({
      open,
      setOpen,
      mobileOpen,
      setMobileOpen
    }),
    [open, setOpen, mobileOpen, setMobileOpen]
  );

  return (
    <SidebarContext.Provider value={context}>
      <div className={"w-full h-full flex flex-row flex-nowrap gap-2"}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

/**
 * Sidebar 左侧边栏
 */

export const SidebarMenuContainer = Listbox;
export const SidebarMenuSection = ListboxSection;
export const SidebarMenuItem = ListboxItem;

export default function SidebarMenu(
  {
    menuConfig
  }: {
    menuConfig: sidebarSection[];
  }
) {
  // const sidebar = useSidebar();
  const isMobile = useIsMobile();

  const location = useLocation();
  const navigate = useNavigate();

  const sidebar = useSidebar();

  /**
   * BUG，直接使用sidebar.mobileOpen会导致Drawer立即触发onClose事件
   */
  const [_mobileOpen, _setMobileOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      _setMobileOpen(sidebar.mobileOpen);
    });
  }, [sidebar.mobileOpen]);

  const sidebarContent = () => (
    <SidebarMenuContainer
      aria-label="Sidebar Menu"
      className={`flex-grow p-3 duration-200 overflow-y-scroll scrollbar-hide ${
        sidebar.open ? "" : "hidden"
      }`}
      style={{
        height: "calc(100dvh - 64px)"
      }}
      variant={"flat"}
    >
      {
        menuConfig.map((section) => (
          <SidebarMenuSection key={section.label} title={section.label}>
            {
              section.items.map((item) => (
                <SidebarMenuItem
                  key={item.label}
                  className={"mt-3"}
                  description={item.description}
                  endContent={(
                    <>
                      {location.pathname === item.href && (
                        <span className={"-rotate-45"}><MousePointer /></span>
                      )}
                    </>
                  )}
                  startContent={item.icon}
                  onPress={() => navigate(item.href)}
                >
                  {item.label}
                </SidebarMenuItem>
              ))
            }
          </SidebarMenuSection>
        ))
      }
    </SidebarMenuContainer>
  );

  if (isMobile) {
    return (
      <>
        <Button
          className={"absolute top-14 active:top-16 left-3 duration-500"}
          color={"primary"}
          isIconOnly={true}
          size={"sm"}
          variant={"shadow"}
          onPress={() => sidebar.setMobileOpen(true)}
        >
          {
            sidebar.mobileOpen ? (
              <ChevronLeft />
            ) : (
              <ChevronRight />
            )
          }
        </Button>
        <Drawer
          backdrop={"blur"}
          closeButton={<></>}
          isOpen={_mobileOpen}
          placement={"left"}
          size={"xs"}
          onOpenChange={sidebar.setMobileOpen}
        >
          <DrawerContent>
            {sidebarContent()}
          </DrawerContent>
        </Drawer>
      </>
    );
  } else {
    return (
      <aside
        className={`flex-none flex flex-row gap-3 ml-2 duration-200 ${
          sidebar.open ? "translate-x-0 w-60" : "-translate-x-full w-0"
        }`}
      >
        <div className={"w-full h-full relative overflow-visible"}>
          {sidebarContent()}
          <Button
            className={"absolute -right-7 top-1/2 -translate-y-1/2"}
            isIconOnly={true}
            size={"sm"}
            variant={"light"}
            onPress={() => sidebar.setOpen(!sidebar.open)}
          >
            {
              sidebar.open ? (
                <ChevronLeft />
              ) : (
                <ChevronRight />
              )
            }
          </Button>
        </div>
        <Divider className={"opacity-45 -z-10"} orientation={"vertical"} />
      </aside>
    );
  }
}


/**
 * Sidebar 右侧内容
 */

export function SidebarMain(
  {
    children
  }: {
    children?: ReactNode;
  }
) {


  return (
    <main
      className={"flex-1 overflow-y-scroll overflow-x-hidden"}
      id={"main"}
      style={{
        height: "calc(100dvh - 64px)"
      }}
    >
      {children}
      <BackTop scrollContainer={"#main"} />
    </main>
  );
}
