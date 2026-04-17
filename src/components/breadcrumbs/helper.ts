import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/path";

type BreadcrumbKeys =
  | "DASHBAORD"
  | "CUSTOMER_MANAGEMENT"
  | "CUSTOMER_MANAGEMENT_DETAILS"
  | "CMS"
  | "VIEW_PROFILE"
  | "EDIT_PROFILE";

const useBreadcrumbs = (type: BreadcrumbKeys) => {
  const navigate = useNavigate();
  const breadcrumbs = {
    DASHBAORD: [
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
  };

  return breadcrumbs[type];
};

export default useBreadcrumbs;
