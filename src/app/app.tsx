import { WaUser } from "@/app/user.ts";
import { WaApi } from "@/app/api";

export class WaApp {
  user: WaUser;
  api: WaApi;

  constructor() {
    this.api = new WaApi(this);
    this.user = new WaUser(this);
  }

  showVersion() {
    console.info(`${__WA_FRONTEND_PACKAGE_NAME__}\n${__WA_FRONTEND_PACKAGE_VERSION__}`);
  }
}

export const app = new WaApp();

