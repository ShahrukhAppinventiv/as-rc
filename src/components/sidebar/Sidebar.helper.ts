import type { IconType } from "react-icons";
import { Icons } from "../../constants/icons";
import { Paths } from "../../constants/path";
import { useAppSelector } from "../../store/store";

export interface SidebarItem {
  name: string;
  path: string; // direct route
  icon: IconType;
  module: string;
}

type UserProfile = {
  userType: string;
  role?: {
    permissions: any[];
  };
};

// export const menuItems: SidebarItem[] = [
//   { name: "Dashboard", icon: Icons.DASHBOARD, path: Paths.DASHBOARD },
//   {
//     name: "Customer Management",
//     icon: Icons.USER,
//     path: Paths.CUSTOMER_MANAGEMENT,
//   },
//   { name: "Medicine", icon: Icons.MEDICINE, path: Paths.MEDICINE },
//   { name: "Inventory Management", icon: Icons.INVENTORY, path: "/inventory" },
//   { name: "CMS", icon: Icons.SETTINGS, path: Paths.CMS },
//   { name: "Roles & Permission", icon: Icons.SETTINGS, path: Paths.ROLES },
// ];

export const useSidebarHelper = () => {
  const profileDetails = useAppSelector((state) => state.profileSlice.data);
  const sidebarMenus: SidebarItem[] = [
    {
      name: "Dashboard",
      icon: Icons.DASHBOARD,
      path: Paths.DASHBOARD,
      module: "dashboard",
    },
    {
      name: "Customer Management",
      icon: Icons.USER,
      path: Paths.CUSTOMER_MANAGEMENT,
      module: "customer",
    },
    { name: "CMS", icon: Icons.SETTINGS, path: Paths.CMS, module: "cms" },
    {
      name: "Roles & Permission",
      icon: Icons.SETTINGS,
      path: Paths.ROLES,
      module: "user",
    },
     {
      name: "User Management",
      icon: Icons.SETTINGS,
      path: Paths.USER_MANAGEMENT,
      module: "user",
    },
    {
      name: "Item Management",
      icon: Icons.MEDICINE,
      path: Paths.MEDICINE,
      module: "item",
    },
  ];

  const hasAccess = (
    user: UserProfile,
    module: string,
    action: string = "view",
  ): boolean => {
    if (user?.userType === "ADMIN") {
      return true;
    }
    const permissions = user?.role?.permissions || [];
    if (!permissions.length) return false;
    return permissions.some((p) => p.module === module && p.action === action);
  };

  return {
    sidebarMenus,
    hasAccess,
    profileDetails,
  };
};
