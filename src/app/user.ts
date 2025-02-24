import { WaApp } from "@/app/app.tsx";

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
  status: "confirm" | "pending" = "pending";

  constructor(app: WaApp) {
    this.app = app;

    this.app.api.isLogin().then(() => {
    });
  }


}
