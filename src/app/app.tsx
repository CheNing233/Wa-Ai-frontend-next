import { WaUser } from "@/app/user.ts";
import { WaApi } from "@/app/api";
import { WaParamForm } from "@/app/param-form.ts";
import { WaStaticImage } from "@/app/static-image.ts";
import { WaTask } from "@/app/task.ts";

export class WaApp {
  user: WaUser;
  api: WaApi;
  paramForm: WaParamForm;
  staticImage: WaStaticImage;
  task: WaTask;

  constructor(
    test_url?: string
  ) {
    this.api = new WaApi(this, test_url);
    this.user = new WaUser(this);
    this.paramForm = new WaParamForm(this);
    this.staticImage = new WaStaticImage(this);
    this.task = new WaTask(this);
  }

  showVersion() {
    console.info(`${__WA_FRONTEND_PACKAGE_NAME__}\n${__WA_FRONTEND_PACKAGE_VERSION__}`);
  }
}

export const app = new WaApp();

