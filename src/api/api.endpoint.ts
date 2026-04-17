const endpoints = {
  auth: {
    login: "admin/api/v1/login",
    forgotPpassword: "admin/api/v1/forgot-password",
    verifyOTP: "admin/api/v1/verify-otp",
    resetPassword: "admin/api/v1/reset-password",
  },
  main: {
    customerListing: "user/api/v1/user/user-management/list",
    customerDetails: "user/api/v1/user/user-management/detail",
    customerStatusUpdate: "user/api/v1/user/user-management/update-status",
    logout: "admin/api/v1/logout",
    profile: "admin/api/v1/profile",
    updateProfile: "admin/api/v1/update-profile",
    cms: "cms/api/v1/application-terms",
    medicine: "productcore/api/v1/list",
  },
};
export default endpoints;
