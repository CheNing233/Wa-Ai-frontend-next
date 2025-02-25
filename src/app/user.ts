import { WaApp } from "@/app/app.tsx";
import { LoginParams } from "@/app/api/model/user.ts";
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

    this.checkLoginState().then((isLogin) => {
      if (isLogin) {
        this.getMyUserInfo().finally();
      }
    });
  }


  async login(p: LoginParams) {
    useUserStore.getState().setUserState("pending");
    await this.app.api.login(p);
    await this.checkLoginState();
  }

  async logout() {
    useUserStore.getState().setUserState("pending");
    await this.app.api.logout();
    await this.checkLoginState();
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
}

