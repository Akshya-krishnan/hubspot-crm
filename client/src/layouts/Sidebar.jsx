import { NavLink } from "react-router-dom";
import { sidebarMenu } from "../data/sidebarMenu";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <h1 className="text-2xl font-bold text-[#5B4AE6] mb-10">
        HubSpot CRM
      </h1>

      <nav className="space-y-2">
        {sidebarMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#5B4AE6] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;