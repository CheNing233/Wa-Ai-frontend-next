import dotenv from "dotenv";
import "cross-fetch/polyfill";

import { WaApi } from "@/app/api/index.ts";
import { WaApp } from "@/app/app.tsx";
import { LoginParams } from "@/app/api/model/user.ts";
import { apiRoutes } from "@/config/api-routes.ts";

dotenv.config({
  path: [
    ".env.development.local",
    ".env.development"
  ]
});


describe("WaApi", () => {
  let api: WaApi;
  let app: WaApp;

  beforeEach(() => {
    app = new WaApp(process.env.API_URL);
    api = app.api;
  });

  describe("fetchApi", () => {
    it("should handle successful HTTP response", async () => {
      const response = await api.fetchApi(apiRoutes.account.isLogin, { method: "GET" });

      expect(response).not.toBeNull();
      expect(response?.status).toBe(200);
    });

    it("should handle HTTP error response", async () => {
      const response = await api.fetchApi("no-resource", { method: "GET" });

      expect(response).not.toBeNull();
      expect(response?.status).toBe(404);
    });
  });

  describe("isLogin", () => {
    it("should return parsed JSON response", async () => {
      const result = await api.isLogin();

      expect(result).not.toBeNull();
      expect(result).not.toBeUndefined();
    });
  });

  describe("login", () => {
    it("should send login request", async () => {
      const loginParams: LoginParams = { userName: "test", password: "test" };

      const r = await api.login(loginParams);

      expect(r).not.toBeNull();
      expect(r).not.toBeUndefined();
    });
  });
});
