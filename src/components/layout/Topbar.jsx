import { Menu } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Topbar({ setSidebarOpen }) {
  const { logout } = useAuth();

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between px-4 md:px-6">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden"
        >
          <Menu size={28} />
        </button>

        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>
      </div>

      {/* Right Side */}
      <button
        onClick={logout}
        className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm"
      >
        Logout
      </button>
    </header>
  );
}

export default Topbar;