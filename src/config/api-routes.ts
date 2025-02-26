export const apiRoutes = {
  account: {
    login: "/account/login" as const,
    logout: "/account/logout" as const,
    register: "/account/register" as const,
    isLogin: "/account/isLogin" as const,
    me: "/account/me" as const,
    sendEmailCode: "/account/sendRegisterMail" as const,
    resetPassword: "/account/forgetPassword" as const,
  }
};
