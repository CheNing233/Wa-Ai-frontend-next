import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import SidebarMenu, { SidebarMain, SidebarProvider } from "@/components/sidebar.tsx";
import { sidebarMenuConfig } from "@/config/menu.tsx";
import lazyLoad from "@/utils/lazyload.tsx";

const Home = lazyLoad(
  () => import("@/pages/paint/home.tsx")
);

const Posts = lazyLoad(
  () => import("@/pages/paint/posts.tsx")
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
        </Routes>
      </SidebarMain>
    </SidebarProvider>
  );
}
