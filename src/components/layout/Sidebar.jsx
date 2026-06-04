import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Members",
    path: "/members",
    icon: Users,
  },
  {
    name: "Events",
    path: "/events",
    icon: Calendar,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-64 min-h-screen bg-zinc-900 border-r border-zinc-800 p-4
          transform transition-transform duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <div className="flex items-center justify-between mb-10 lg:block">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Covenant
            <span className="text-emerald-400">
              Hub
            </span>
          </h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() =>
                  setSidebarOpen(false)
                }
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-emerald-500 text-black"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`
                }
              >
                <Icon size={20} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;