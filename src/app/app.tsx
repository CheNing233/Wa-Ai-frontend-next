import { WaUser } from "@/app/user.ts";
import { WaApi } from "@/app/api";
import { WaParamForm } from "@/app/param-form.ts";

export class WaApp {
  user: WaUser;
  api: WaApi;
  paramForm: WaParamForm;

  constructor(
    test_url?: string
  ) {
    this.api = new WaApi(this, test_url);
    this.user = new WaUser(this);
    this.paramForm = new WaParamForm(this);
  }

  showVersion() {
    console.info(`${__WA_FRONTEND_PACKAGE_NAME__}\n${__WA_FRONTEND_PACKAGE_VERSION__}`);
  }
}

export const app = new WaApp();

