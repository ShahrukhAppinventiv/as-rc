import type { IconType } from "react-icons";
import { Icons } from "../../constants/icons";
import { Paths } from "../../constants/path";

export interface SidebarItem {
  name: string;
  path: string; // direct route
  icon: IconType;
}

export const menuItems: SidebarItem[] = [
  { name: "Dashboard", icon: Icons.DASHBOARD, path: Paths.DASHBOARD },
  {
    name: "Customer Management",
    icon: Icons.USER,
    path: Paths.CUSTOMER_MANAGEMENT,
  },
  { name: "Medicine", icon: Icons.MEDICINE, path: Paths.MEDICINE },
  { name: "Inventory Management", icon: Icons.INVENTORY, path: "/inventory" },
  { name: "CMS", icon: Icons.SETTINGS, path: Paths.CMS },
];
