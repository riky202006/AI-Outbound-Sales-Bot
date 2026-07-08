import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  BarChart3,
  Settings,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
 
  {
    name: "Email Center",
    path: "/emails",
    icon: Mail,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-white/10 p-6 fixed left-0 top-0">

      <h1 className="text-2xl font-bold text-cyan-400 mb-10">
        LeadPilot AI
      </h1>

      <div className="space-y-3">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-cyan-500 text-white"
                    : "hover:bg-white/10 text-slate-300"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}