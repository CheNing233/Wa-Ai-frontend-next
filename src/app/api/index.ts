import { WaApp } from "@/app/app.tsx";
import { IsLoginResponse, LoginParams } from "@/app/api/model/user.ts";
import { apiRoutes } from "@/config/api-routes.ts";


export const WaApiEventList = {
  http_error: "http_error" as const,
  network_error: "network_error" as const
};

export class WaApi extends EventTarget {
  #registeredType = new Set<string>();

  app: WaApp;
  api_host: string;


  constructor(app: WaApp) {
    super();
    this.app = app;
    this.api_host = location.protocol + "//" + location.host;
  }

  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean
  ) {
    super.addEventListener(type, callback, options);
    this.#registeredType.add(type);
  }

  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null
  ) {
    super.removeEventListener(type, callback);
  }

  getApiUrl() {
    return `${this.api_host}/api`;
  }

  getWsUrl() {
    return `${this.api_host}/ws`;
  }

  async fetchApi(url: string, options?: RequestInit): Promise<Response | null> {
    try {
      const target = this.getApiUrl() + url;
      const response = await fetch(target, options);

      // 处理非网络错误（HTTP状态码错误）
      if (!response.ok) {
        console.warn(`WaApi HTTP Error: ${response.status} ${response.statusText}`);
        this.dispatchEvent(new CustomEvent(WaApiEventList.http_error, {
          detail: {
            status: response.status,
            statusText: response.statusText
          }
        }));
      }

      return response;
    } catch (e) {
      // 仅捕获网络错误（如DNS解析失败、跨域限制等）
      console.warn("WaApi Network Error:", e);
      this.dispatchEvent(new CustomEvent(WaApiEventList.network_error, {
        detail: e
      }));

      return null;
    }
  }

  async login(p: LoginParams) {
    const r = await this.fetchApi(apiRoutes.account.login, {
      method: "POST",
      body: JSON.stringify(p)
    });

    console.log(r);
  }

  async isLogin() {
    const r = await this.fetchApi(apiRoutes.account.isLogin, {
      method: "GET"
    });

    const data: IsLoginResponse = await r?.json() || null;

    return data?.success || false;
  }
}

