// import React from "react";

import NavBar from "@/components/layout/NavBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <NavBar />

      {/* Dynamic Viewport Content Wrapper */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6">
        {/* 
          💡 CRITICAL ROUTING POINT:
          The <Outlet /> component acts as a placeholder. When a user navigates 
          to '/categories', the <Categories /> component will automatically 
          mount and render right here inside this container.
        */}
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

export default Home;
