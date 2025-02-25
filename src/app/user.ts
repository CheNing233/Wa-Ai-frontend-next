import { WaApp } from "@/app/app.tsx";
import { LoginParams, RegisterParams, SendEmailCodeParams } from "@/app/api/model/user.ts";
import { useUserStore } from "@/stores/userStore.ts";
import { addToast } from "@heroui/toast";


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

    this.checkLoginState().then((isLogin) => {
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
  }

  async logout() {
    useUserStore.getState().setUserState("pending");
    await this.app.api.logout();
    await this.checkLoginState();

    addToast({
      title: "登出成功",
      description: "再会喵~",
      color: "success"
    });
  }

  async checkLoginState() {
    const isLoginResult = await this.app.api.isLogin();

    if (isLoginResult.success) {
      useUserStore.getState().setUserState("loggedIn");
      this.getMyUserInfo().finally();

      return true;
    } else {
      useUserStore.getState().setUserState("loggedOut");
      useUserStore.getState().clearUser();

      return false;
    }
  }

  async getMyUserInfo() {
    const getMyUserInfoResult = await this.app.api.getMyUserInfo();

    if (getMyUserInfoResult.success) {
      const MyUserInfo: Partial<UserType> = getMyUserInfoResult.data;

      useUserStore.getState().setUser(MyUserInfo);
    }
  }

  async register(p: RegisterParams) {
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
  }
}

