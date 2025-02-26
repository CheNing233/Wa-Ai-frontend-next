import { addToast } from "@heroui/toast";

import { WaApp } from "@/app/app.tsx";
import { LoginParams, RegisterParams, ResetPasswordParams, SendEmailCodeParams } from "@/app/api/model/user.ts";
import { useUserStore } from "@/stores/userStore.ts";


export type UserType = {
  id: number,
  nickName: string;
  userName: string;
  avatar: string;
  avatarUrl?: string;
  email: string;
  gender?: string;
  description?: string | null;
  calculationPoint?: any,
  githubId?: number | null

  freePoints?: number | 0;
  payPoints?: number | 0;
}

export class WaUser {
  app: WaApp;

  constructor(app: WaApp) {
    this.app = app;

    useUserStore.getState().setUserState("pending");

    this.checkLoginState().then(([, isLogin]) => {
      if (isLogin) {
        this.getMyUserInfo().finally();
      }
    });
  }

  async login(p: LoginParams) {
    useUserStore.getState().setUserState("pending");
    const r = await this.app.api.login(p);

    await this.checkLoginState();

    if (r.success) {
      addToast({
        title: "登录成功",
        description: "今天想画点什么呢?",
        color: "success"
      });
    } else {
      addToast({
        title: "登录失败",
        description: r.errorMsg,
        color: "danger"
      });
    }

    return r.success;
  }

  async logout() {
    useUserStore.getState().setUserState("pending");
    const r = await this.app.api.logout();

    await this.checkLoginState();

    addToast({
      title: "登出成功",
      description: "再会喵~",
      color: "success"
    });

    return r.success;
  }

  /**
   * 异步检查用户的登录状态
   * 此函数用于检查用户当前是否已登录，并根据登录状态更新用户信息
   *
   * @returns {Promise<[boolean, boolean]>} 返回一个包含两个布尔值的数组：
   *          第一个表示API调用是否成功，第二个表示用户是否已登录
   */
  async checkLoginState(): Promise<[boolean, boolean]> {
    // 调用app的API检查用户是否已登录
    const isLoginResult = await this.app.api.isLogin();

    if (isLoginResult.success) {
      // 如果登录成功，设置用户状态为已登录，并获取用户信息
      useUserStore.getState().setUserState("loggedIn");
      this.getMyUserInfo().finally();

      // 返回成功标志和登录状态（已登录）
      return [isLoginResult.success, true];
    } else {
      // 如果未登录，设置用户状态为未登录，并清除用户信息
      useUserStore.getState().setUserState("loggedOut");
      useUserStore.getState().clearUser();

      // 返回成功标志和登录状态（未登录）
      return [isLoginResult.success, false];
    }
  }

  async getMyUserInfo() {
    const getMyUserInfoResult = await this.app.api.getMyUserInfo();

    if (getMyUserInfoResult.success) {
      const MyUserInfo: Partial<UserType> = getMyUserInfoResult.data;

      useUserStore.getState().setUser(MyUserInfo);
    }

    return getMyUserInfoResult.success;
  }

  async register(p: RegisterParams) {
    useUserStore.getState().setUserState("pending");
    const r = await this.app.api.register(p);

    if (r.success) {
      addToast({
        title: "注册成功",
        description: "请登录，不要马上忘掉密码喵",
        color: "success"
      });
    } else {
      addToast({
        title: "注册失败",
        description: r.errorMsg,
        color: "danger"
      });
    }
    useUserStore.getState().setUserState("loggedOut");

    return r.success;
  }

  async sendEmailCode(p: SendEmailCodeParams) {
    const r = await this.app.api.sendEmailCode(p);

    if (r.success) {
      addToast({
        title: "发送成功",
        description: "请检查邮箱，10分钟内完成喵",
        color: "success"
      });
    } else {
      addToast({
        title: "发送失败",
        description: r.errorMsg,
        color: "danger"
      });
    }

    return r.success;
  }

  async resetPassword(p: ResetPasswordParams) {
    useUserStore.getState().setUserState("pending");
    const r = await this.app.api.resetPassword(p);

    if (r.success) {
      addToast({
        title: "重置成功",
        description: "不要马上又忘掉密码喵",
        color: "success"
      });
    } else {
      addToast({
        title: "重置失败",
        description: r.errorMsg,
        color: "danger"
      });
    }
    useUserStore.getState().setUserState("loggedOut");

    return r.success;
  }
}

