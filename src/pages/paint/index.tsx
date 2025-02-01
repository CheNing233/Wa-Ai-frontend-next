import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import SidebarMenu, { SidebarMain, SidebarProvider } from "@/components/sidebar.tsx";
import { sidebarMenuConfig } from "@/config/menus.tsx";
import lazyLoad from "@/utils/lazyload.tsx";

const Home = lazyLoad(
  () => import("@/pages/paint/home.tsx")
);

const Posts = lazyLoad(
  () => import("@/pages/paint/posts.tsx")
);

const Models = lazyLoad(
  () => import("@/pages/paint/models.tsx")
);

export default function PaintPage() {
  return (
    <SidebarProvider>
      <SidebarMenu
        menuConfig={sidebarMenuConfig.paint}
      />
      <SidebarMain>
        <Outlet />
        <Routes>
          <Route
            element={<Navigate to={"home"} />}
            index={true}
          />

          <Route
            element={<Home />}
            path={"home"}
          />
          <Route
            element={<Posts />}
            path={"posts"}
          />
          <Route
            element={<Models />}
            path={"models"}
          />
        </Routes>
      </SidebarMain>
    </SidebarProvider>
  );
}
