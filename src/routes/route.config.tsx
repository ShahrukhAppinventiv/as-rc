import { lazy } from "react";
import { Paths } from "../constants/path";

const Login = lazy(() => import("../pages/Onboarding/Login/Login"));
const ForgotPassword = lazy(
  () => import("../pages/Onboarding/ForgotPassword/ForgotPassword"),
);
const VerifyOTP = lazy(() => import('../pages/Onboarding/VerifyOTP/VerifyOTP'))
const ResetPassword = lazy(
  () => import("../pages/Onboarding/ResetPassword/ResetPassword"),
);
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Medicine = lazy(() => import('../pages/Medicine/Medicine'))
const CustomerManagement = lazy(() => import("../pages/customer-management"))
const CustomerList = lazy(() => import('../pages/customer-management/pages/customer-list'))
const CustomerDetails = lazy(() => import('../pages/customer-management/pages/customer-details'))
const AdminProfile = lazy(() => import('../pages/Profile/pages/view-profile'));
const EditAdminProfile = lazy(() => import("../pages/Profile/pages/edit-profile"))
const Cms = lazy(() => import('../pages/cms'))
const Roles = lazy(() => import('../pages/roles'))
const RolesList = lazy(() => import('../pages/roles/pages/roles-listing'))
const ViewRole = lazy(() => import("../pages/roles/pages/role-details"))
const AddRole = lazy(() => import("../pages/roles/pages/add-edit-role"))
const EditRole = lazy(() => import("../pages/roles/pages/add-edit-role"))
const UserManagement = lazy(() => import("../pages/user-management"))
const UserList = lazy(() => import("../pages/user-management/pages/user-list"))
const AddUser = lazy(() => import("../pages/user-management/pages/add-edit-user"))
const EditUser = lazy(() => import("../pages/user-management/pages/add-edit-user"))
const UserDetails = lazy(() => import("../pages/user-management/pages/user-details"))

export const publicRouteList = [
  {
    index: true,
    element: <Login />,
  },
  {
    path: Paths.LOGIN,
    element: <Login />,
  },
  {
    path: Paths.FORGET_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: Paths.VERIFY_OTP,
    element: <VerifyOTP />
  },
  {
    path: `${Paths.RESET_PASSWORD}/:sessionToken`,
    element: <ResetPassword />,
  },
];

export const privateRouteList = [
  {
    index: true,
    element: <Dashboard />
  },
  {
    path: Paths.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: Paths.MEDICINE,
    element: <Medicine />
  },
  {
    path: Paths.CUSTOMER_MANAGEMENT,
    element: <CustomerManagement />,
    module: "customer",
    children: [
      {
        index: true,
        element: <CustomerList />,
      },
      {
        path: "details/:id",
        element: <CustomerDetails />,
      }
    ]
  },

  {
    path: Paths.USER_MANAGEMENT,
    element: <UserManagement />,
    module: "user",
    children: [
      {
        index: true,
        element: <UserList />
      },
      {
        path: "add",
        element: <AddUser />,

      },
      {
        path: "edit/:id",
        element: <EditUser />,

      },
      {
        path: 'details/:id',
        element: <UserDetails />
      }
    ]
  },
  {
    path: Paths.ADMIN_PROFILE,
    element: <AdminProfile />
  },
  {
    path: Paths.EDIT_PROFILE,
    element: <EditAdminProfile />

  },
  {
    path: Paths.CMS,
    element: <Cms />
  },

  {
    path: Paths.ROLES,
    element: <Roles />,
    module: "user",
    children: [
      {
        index: true,
        element: <RolesList />,
      },
      {
        path: "details/:roleId",
        element: <ViewRole />,
      },
      {
        path: "add",
        element: <AddRole />,

      },
      {
        path: "edit/:roleId",
        element: <EditRole />,

      }
    ]
  },



];
