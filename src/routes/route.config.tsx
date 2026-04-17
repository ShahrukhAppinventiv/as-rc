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
const CustomerManagement = lazy(() => import('../pages/CustomerManagement/customer-list'))
const CustomerDetails = lazy(() => import('../pages/CustomerManagement/CustomerDetails'))
const AdminProfile = lazy(() => import('../pages/Profile/pages/view-profile'));
const EditAdminProfile = lazy(() => import("../pages/Profile/pages/edit-profile"))
const Cms = lazy(() => import('../pages/CMS'))

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
    element: <CustomerManagement />
  },
  {
    path: `${Paths.CUSTOMER_DETAILS}/:customerId`,
    element: <CustomerDetails />
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
  }
];
