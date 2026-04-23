
import { NavLink } from "react-router-dom";
import { useSidebarHelper } from "./Sidebar.helper";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
type SidebarProps = {
  collapsed: boolean;
};

export default function Sidebar({ collapsed }: SidebarProps) {

  const { sidebarMenus, hasAccess, profileDetails } = useSidebarHelper()

  const filteredMenu = sidebarMenus.filter(item =>
    hasAccess(profileDetails, item.module, "view")
  );



  return (
    <div
      className={`h-screen bg-white shadow-md overflow-hidden
  transition-[width] duration-300 ease-in-out
  ${collapsed ? "w-20" : "w-64"}`}
    >
      <ul className="mt-4 h-[calc(100%-60px)] overflow-y-auto">

        {!filteredMenu.length &&
          Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="px-4 py-3 flex items-center gap-3">
              <Skeleton circle width={20} height={20} />
              {!collapsed && (
                <Skeleton width={120} height={15} />
              )}
            </li>
          ))}
        {filteredMenu.length && filteredMenu.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.name}>

              <NavLink
                to={item.path}
                title={collapsed ? item.name : ""}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 transition-all ${isActive
                    ? "bg-blue-50 border-r-4 border-blue-600 text-blue-600"
                    : "hover:bg-gray-100"
                  }`
                }
              >
                <span className="text-xl min-w-[24px]">
                  {Icon && <Icon size={20} />}
                </span>
                <span
                  className={`whitespace-nowrap transition-all duration-200
          ${collapsed
                      ? "opacity-0 scale-95 w-0 ml-0"
                      : "opacity-100 scale-100 w-auto ml-3"}`}
                >
                  {item.name}
                </span>
              </NavLink>

            </li>
          )
        }

        )}
      </ul>
    </div>
  );
}