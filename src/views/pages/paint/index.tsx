import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import SidebarMenu, { SidebarMain, SidebarProvider } from "@/components/sidebar.tsx";
import { sidebarMenuConfig } from "@/config/menus.tsx";
import lazyLoad from "@/utils/lazyload.tsx";

const Home = lazyLoad(
  () => import("@/views/pages/paint/home.tsx")
);

const Posts = lazyLoad(
  () => import("@/views/pages/paint/posts.tsx")
);

const Models = lazyLoad(
  () => import("@/views/pages/paint/models.tsx")
);

const Prompts = lazyLoad(
  () => import("@/views/pages/paint/prompts.tsx")
);

const QuickStart = lazyLoad(
  () => import("@/views/pages/paint/quick-start.tsx")
);

const A1111 = lazyLoad(
  () => import("@/views/pages/paint/a1111.tsx")
);

const Comfy = lazyLoad(
  () => import("@/views/pages/paint/comfy.tsx")
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
          <Route
            element={<Prompts />}
            path={"prompts"}
          />
          <Route
            element={<QuickStart key={"quick-start"} />}
            path={"quick-start"}
          />
          <Route
            element={<A1111 key={"standard"} />}
            path={"standard"}
          />
          <Route
            element={<Comfy key={"comfy"} />}
            path={"comfy"}
          />
        </Routes>
      </SidebarMain>
    </SidebarProvider>
  );
}
