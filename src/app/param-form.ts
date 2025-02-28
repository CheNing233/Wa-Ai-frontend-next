import { WaApp } from "@/app/app.tsx";
import { txt2img_form_config } from "@/config/param-form-configs.ts";
import { ParamFormType, useTI2I_ParamFormsStore } from "@/stores/paramFormStore.ts";
import { generateId } from "@/utils/tools.ts";


export type ParamFieldConfig = {
  // 字段名
  name: string
  description?: string
  // 类型
  type: "number" | "boolean" | "select" | "radio" | "not-set"
  // 使用点号路径表示法，如 "width" 或 "a.b"
  target: string
  // 选项列表，适用于 select 和 radio
  listOptions?: Array<{ label: string; value: any }>
  // 最小值，适用于 number
  min?: number
  // 最大值，适用于 number
  max?: number
  // 步长，适用于 number
  step?: number
  // 可选值
  options?: Array<number | string>
  // 推荐值
  recommendations?: Array<number | string>
  // 验证函数，返回错误信息或 null
  validate?: (value: any) => string | null,
  // 转换函数，返回转换后的值，用于转换为目标类型
  convert?: (value: any) => any
}

export type ParamGroupConfig = {
  // 分组标题
  title: string
  // 分组描述
  description: string
  // 分组类型
  type: "model" | "prompt" | "common"
  // 分组字段列表
  fields: ParamFieldConfig[]
}

export type ParamFormConfig = ParamGroupConfig[];


export class WaParamForm {
  app: WaApp;

  constructor(
    app: WaApp
  ) {
    this.app = app;

    const formStore = useTI2I_ParamFormsStore.getState();

    if (formStore.forms.length === 0) {
      this.createForm("txt2img");
    }
  }

  loadConfig(formType: "ti2i" | "extra") {
    switch (formType) {
      case "ti2i":
        return txt2img_form_config;
      case "extra":
        return [];
    }
  }

  createForm(
    formType: "txt2img" | "img2img" | "extra",
    alias: string = new Date().getTime().toString()
  ) {
    const newForm: ParamFormType = {
      id: generateId("param-form"),
      alias: alias,
      type: formType,
      createdAt: new Date(),
      formContent: {
        prompt: "",
        steps: 28,
        seed: -1,
        sampler_name: "Euler a",
        cfg_scale: 7.0,
        width: 512,
        height: 768,
        negative_prompt: "(worst quality:2), (low quality:2), (normal quality:2),",
        enable_hr: true,
        denoising_strength: 0.58,
        n_iter: 1,
        hr_scale: 2.0,
        hr_upscaler: "Latent",
        hr_second_pass_steps: 20,
        override_settings: {
          sd_model_checkpoint: "",
          sd_vae: "ClearVAE_NansLess1.safetensors",
          CLIP_stop_at_last_layers: 2,
          eta_noise_seed_delta: 0
        },
        alwayson_scripts: {}
      }
    };

    useTI2I_ParamFormsStore.getState().addForm(newForm);
    useTI2I_ParamFormsStore.getState().setCurrentId(newForm.id);
  }
}
