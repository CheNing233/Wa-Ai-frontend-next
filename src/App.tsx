import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import ChatPage from "@/pages/chat";
import AboutPage from "@/pages/about";
import PaintPage from "@/pages/paint";
import { Header } from "@/components/header.tsx";
import Background from "@/components/background.tsx";

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

export default App;
