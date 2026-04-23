import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/path";

type BreadcrumbKeys =
  | "DASHBOARD"
  | "CUSTOMER_MANAGEMENT"
  | "CUSTOMER_MANAGEMENT_DETAILS"
  | "CMS"
  | "VIEW_PROFILE"
  | "EDIT_PROFILE"
  | "ROLES"
  | "ROLE_DETAILS"
  | "ADD_ROLE"
  | "EDIT_ROLE"
  | "USER_MANAGEMENT"
  | "ADD_USER"
  | "EDIT_USER"
  | "USER_DETAILS";

const useBreadcrumbs = (type: BreadcrumbKeys) => {
  const navigate = useNavigate();
  const breadcrumbs = {
    DASHBOARD: [
      {
        label: "Dashboard",
        onClick: () => navigate(Paths.DASHBOARD),
      },
    ],
    CUSTOMER_MANAGEMENT: [
      {
        label: "Customer Management",
        onClick: () => navigate(Paths.CUSTOMER_MANAGEMENT),
      },
    ],
    CUSTOMER_MANAGEMENT_DETAILS: [
      {
        label: "Customer Management",
        onClick: () => navigate(Paths.CUSTOMER_MANAGEMENT),
      },
      {
        label: "Details",
        path: Paths.CUSTOMER_DETAILS,
        onClick: () => navigate(Paths.CUSTOMER_DETAILS),
      },
    ],
    CMS: [
      {
        label: "CMS",
        onClick: () => navigate(Paths.CMS),
      },
    ],
    VIEW_PROFILE: [
      {
        label: "Profile",
        onClick: () => navigate(Paths.ADMIN_PROFILE),
      },
    ],
    EDIT_PROFILE: [
      {
        label: "Profile",
        onClick: () => navigate(Paths.ADMIN_PROFILE),
      },
      {
        label: "Edit Profile",
        onClick: () => navigate(Paths.EDIT_PROFILE),
      },
    ],
    ROLES: [
      { label: "Roles & Permission", onClick: () => navigate(Paths.ROLES) },
    ],
    ROLE_DETAILS: [
      { label: "Roles Permission", onClick: () => navigate(Paths.ROLES) },
      { label: "Details", onClick: () => navigate(Paths.ROLES) },
    ],
    ADD_ROLE: [
      { label: "Roles Permission", onClick: () => navigate(Paths.ROLES) },
      { label: "Add", onClick: () => navigate(Paths.ROLES) },
    ],
    EDIT_ROLE: [
      { label: "Roles Permission", onClick: () => navigate(Paths.ROLES) },
      { label: "Edit", onClick: () => navigate(Paths.ROLES) },
    ],
    USER_MANAGEMENT: [
      {
        label: "User Management",
        onClick: () => navigate(Paths.USER_MANAGEMENT),
      },
    ],
    USER_DETAILS: [
      { label: "User Management", onClick: () => navigate(Paths.USER_MANAGEMENT) },
      { label: "Details", onClick: () => navigate(Paths.USER_MANAGEMENT) },
    ],
    ADD_USER: [
      { label: "User Management", onClick: () => navigate(Paths.USER_MANAGEMENT) },
      { label: "Add", onClick: () => navigate(Paths.USER_MANAGEMENT) },
    ],
    EDIT_USER: [
      { label: "User Management", onClick: () => navigate(Paths.USER_MANAGEMENT) },
      { label: "Edit", onClick: () => navigate(Paths.USER_MANAGEMENT) },
    ],
  };

  return breadcrumbs[type];
};

export default useBreadcrumbs;
