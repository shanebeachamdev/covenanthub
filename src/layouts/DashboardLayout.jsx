import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="flex bg-zinc-950 text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar setSidebarOpen={setSidebarOpen} />

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;