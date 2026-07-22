import NavBar from "../common/header/NavBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import "@style/pages.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <NavBar />

      {/* Dynamic Viewport Content Wrapper */}
      <main>
        <Toaster />
        <Outlet />
      </main>

      {/* Global Application Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} TechStore Workspace. All rights
        reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
