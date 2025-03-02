import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import {
  BadgeJapaneseYen,
  ChevronRight,
  Info,
  LayoutDashboard,
  LogIn,
  LogOut,
  MoonIcon,
  SearchIcon,
  Smile,
  Star,
  SunIcon,
  Zap
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import NiceModal from "@ebay/nice-modal-react";

import { headerMenuConfig } from "@/config/menus.tsx";
import BannerButton from "@/components/common/banner-button.tsx";
import { useTheme } from "@/hooks/use-theme.ts";
import { dialogIdsRegister } from "@/config/dialogs.ts";
import { useUserVM } from "@/viewModels/useUserVM.tsx";
import { $app } from "@/app/app.tsx";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, toggleTheme } = useTheme();

  const { user, userState } = useUserVM();

  const handleLogOut = ()=>{
    $app.user.logout().finally();
  }

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm"
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="搜索..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const themeSwitch = (
    <Button
      isIconOnly={true}
      variant={"light"}
      onPress={toggleTheme}
    >
      {theme === "light" ? (
        <MoonIcon size={22} />
      ) : (
        <SunIcon size={22} />
      )}
    </Button>
  );

  return (
    <Navbar className={"justify-items-start"} isBordered={true} maxWidth="full" position="sticky">

      <NavbarContent className="basis-full" justify="start">
        {/*logo*/}
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Avatar
              className={"bg-transparent mr-1.5"}
              disableAnimation={true}
              radius={"none"}
              size={"sm"}
              src={"/logo/logo.gif"}
              style={{
                transform: "translateY(-1px)"
              }}
            />
            <p className="font-bold text-inherit">AI Platform</p>
          </Link>
        </NavbarBrand>

        {/*menu items*/}
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {
            headerMenuConfig.main.map((item) => (
              <NavbarItem key={item.label}>
                <BannerButton
                  banners={item.banner || []}
                  size={"md"}
                  variant={location.pathname.includes(item.href) ? "flat" : "light"}
                  onPress={() => navigate(item.href)}
                >
                  {item.label}
                </BannerButton>
              </NavbarItem>
            ))
          }
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden lg:flex basis-full flex-shrink"
        justify="end"
      >
        <NavbarItem>{searchInput}</NavbarItem>
        <NavbarItem>{themeSwitch}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden pl-4" style={{
        flexShrink: 1,
        flexGrow: 0,
        flexBasis: "auto"
      }}>
        <NavbarMenuToggle />
        <NavbarItem>{themeSwitch}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="pl-4" justify="end" style={{
        flexShrink: 1,
        flexGrow: 0
      }}>
        {userState === "loggedIn" && <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://avatars.githubusercontent.com/u/32773451?v=4"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            className={"w-64"}
            variant="flat"
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <div className={"flex flex-row flex-nowrap items-center gap-3"}>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://avatars.githubusercontent.com/u/32773451?v=4"
                />
                <div>
                  <p className="font-semibold">{user?.nickName}</p>
                  <p className="font-semibold">进入个人中心 {">"}</p>
                </div>
              </div>
            </DropdownItem>
            <DropdownSection title={"算力"}>
              <DropdownItem
                key="logout" color="warning"
                endContent={<ChevronRight />}
                startContent={<Zap />}
              >
                <div className={"ml-1"}>
                  <p className="font-semibold text-medium">10000(购) + 100(赠)</p>
                  <Button
                    className={"mt-1 text-sm font-semibold"}
                    color={"warning"} size={"sm"}
                    startContent={<BadgeJapaneseYen size={18} />}
                    variant={"shadow"}
                  >
                    充值
                  </Button>
                  <Button
                    className={"mt-1 ml-2 text-sm font-semibold"}
                    color={"warning"}
                    size={"sm"}
                    startContent={<Info size={18} />}
                    variant={"light"}
                  >
                    明细
                  </Button>
                </div>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title={"关注"}>
              <DropdownItem key="favourite" startContent={<Star />}>
                我的收藏
              </DropdownItem>
              <DropdownItem key="follow" startContent={<Smile />}>
                我的关注
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title={"高级"}>
              <DropdownItem
                key="dashboard" color="primary"
                startContent={<LayoutDashboard />}
              >
                管理员后台
              </DropdownItem>
              <DropdownItem
                key="logout" color="danger"
                startContent={<LogOut />}
                onPress={handleLogOut}
              >
                登出
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>}

        {userState !== "loggedIn" && <Button
          color={"primary"}
          isIconOnly={userState === "pending"}
          isLoading={userState === "pending"}
          startContent={(userState !== "pending" && <LogIn size={16} />)}
          variant={"shadow"}
          onPress={() => {
            NiceModal.show(dialogIdsRegister.userEnter).finally();
          }}
        >
          {userState !== "pending" && <span className={"font-bold text-sm"}>登录免费画图</span>}
        </Button>}

      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        {/*<div className="mx-4 mt-2 flex flex-col gap-2">*/}
        {/*  {siteConfig.navItems.map((item, index) => (*/}
        {/*    <NavbarMenuItem key={`${item}-${index}`}>*/}
        {/*      <Link*/}
        {/*        color={*/}
        {/*          index === 2*/}
        {/*            ? "primary"*/}
        {/*            : index === siteConfig.navItems.length - 1*/}
        {/*              ? "danger"*/}
        {/*              : "foreground"*/}
        {/*        }*/}
        {/*        href="#"*/}
        {/*        size="lg"*/}
        {/*      >*/}
        {/*        {item.label}*/}
        {/*      </Link>*/}
        {/*    </NavbarMenuItem>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </NavbarMenu>
    </Navbar>
  );
};
