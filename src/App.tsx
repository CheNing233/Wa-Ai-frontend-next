import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import ChatPage from "@/views/pages/chat";
import AboutPage from "@/views/pages/about.tsx";
import PaintPage from "@/views/pages/paint";
import { Header } from "@/components/header.tsx";
import Background from "@/components/common/background.tsx";

function App() {
  return (
    <div className="relative flex flex-col h-dvh overflow-hidden">
      <Header />
      <Outlet />
      <Background/>
      <Routes>
        <Route element={<Navigate replace to="/paint" />} path="/" />

        <Route element={<PaintPage />} path="/paint/*" />
        <Route element={<ChatPage />} path="/chat/*" />
        <Route element={<AboutPage />} path="/about" />
      </Routes>
    </div>
  );
}

App.displayName = "WA";

export default App;
