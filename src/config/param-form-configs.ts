import { ParamFormConfig } from "@/app/param-form.ts";

export const txt2img_form_config: ParamFormConfig = [
  {
    title: "Model",
    description: "Select the model you want to use",
    type: "model",
    fields: [
      {
        name: "model",
        type: "not-set",
        target: "model",
        listOptions: [
          {
            label: "Stable Diffusion 1.5",
            value: "stabilityai/stable-diffusion-2-1-base"
          },
          {
            label: "Stable Diffusion 2.1",
            value: "stabilityai/stable-diffusion-2-1"
          }
        ]
      }
    ]
  },
  {
    title: "Prompt",
    description: "Enter the prompt you want to generate",
    type: "prompt",
    fields: [
      {
        name: "prompt",
        type: "not-set",
        target: "prompt"
      }
    ]
  },
  {
    title: "基本设置",
    description: "设置模型如何生成",
    type: "common",
    fields: [
      {
        name: "宽度",
        description: "width",
        type: "number",
        target: "width",
        min: 64,
        max: 2048,
        step: 8,
        recommendations: [832, 1152, 1216, 512, 768],
        options: [1024, 1344, 1536]
      },
      {
        name: "高度",
        description: "height",
        type: "number",
        target: "height",
        min: 64,
        max: 2048,
        step: 8,
        recommendations: [832, 1152, 1216, 512, 768],
        options: [1024, 1344, 1536]
      },
      {
        name: "采样步数",
        description: "steps",
        type: "number",
        target: "steps",
        min: 1,
        max: 100,
        step: 1,
        recommendations: [28, 38, 40],
        options: [30, 32, 35]
      },
      {
        name: "采样方法",
        description: "sampler_name",
        type: "select",
        target: "sampler_name",
        recommendations: ["Euler a", "Euler", "DPM++ 2M SDE", "DPM++ 2M Karras", "DDIM"],
        options: [
          "Euler a",
          "Euler",
          "DPM++ 2M Karras",
          "DPM++ SDE Karras",
          "DPM++ 2M SDE Exponential",
          "DPM++ 2M SDE Karras",
          "LMS",
          "Heun",
          "DPM2",
          "DPM2 a",
          "DPM++ 2S a",
          "DPM++ 2M",
          "DPM++ SDE",
          "DPM++ 2M SDE",
          "DPM++ 2M SDE Heun",
          "DPM++ 2M SDE Heun Karras",
          "DPM++ 2M SDE Heun Exponential",
          "DPM++ 3M SDE",
          "DPM++ 3M SDE Karras",
          "DPM++ 3M SDE Exponential",
          "DPM fast",
          "DPM adaptive",
          "LMS Karras",
          "DPM2 Karras",
          "DPM2 a Karras",
          "DPM++ 2S a Karras",
          "Restart",
          "DDIM",
          "PLMS",
          "UniPC",
          "LCM"
        ]
      },
      {
        name: "提示词相关度",
        description: "cfg_scale",
        type: "number",
        target: "cfg_scale",
        min: 0,
        max: 30,
        step: 0.1,
        recommendations: [4.5, 5.5, 6, 7],
        options: [3, 4, 5, 6, 7, 8]
      },
      {
        name: "种子",
        description: "seed",
        type: "number",
        target: "seed",
        min: -1,
        max: 2147483647,
        step: 1,
        recommendations: [-1],
        options: [-1]
      }
    ]
  },
  {
    title: "高清修复",
    description: "将图片放大后重绘",
    type: "common",
    fields: [
      {
        name: "启用",
        description: "enable_hr",
        type: "boolean",
        target: "enable_hr"
      },
      {
        name: "放大倍数",
        description: "hr_scale",
        type: "number",
        target: "hr_scale",
        min: 0,
        max: 4,
        step: 0.1,
        recommendations: [2, 4],
        options: [1, 2, 3, 4]
      },
      {
        name: "重绘算法",
        description: "hr_upscaler",
        type: "select",
        target: "hr_upscaler",
        recommendations: ["Latent", "R-ESRGAN 4x+ Anime6B", "SwinIR 4x", "ESRGAN_4x"],
        options: [
          "Latent",
          "Latent (antialiased)",
          "Latent (bicubic)",
          "Latent (bicubic antialiased)",
          "Latent (nearest)",
          "Latent (nearest-exact)",
          "None",
          "Lanczos",
          "Nearest",
          "ESRGAN_4x",
          "LDSR",
          "R-ESRGAN 4x+",
          "R-ESRGAN 4x+ Anime6B",
          "ScuNET GAN",
          "ScuNET PSNR",
          "SwinIR 4x"
        ]
      },
      {
        name: "重绘采样步数",
        description: "hr_second_pass_steps",
        type: "number",
        target: "hr_second_pass_steps",
        min: 1,
        max: 150,
        step: 1,
        recommendations: [28, 38, 40],
        options: [30, 32, 35]
      },
      {
        name: "重绘幅度",
        description: "denoising_strength",
        type: "number",
        target: "denoising_strength",
        min: 0,
        max: 1,
        step: 0.01,
        recommendations: [0.5, 0.8],
        options: [0.3, 0.5, 0.7]
      }
    ]
  },
  {
    title: "高级设置",
    description: "一般默认值即可，可根据模型要求调整",
    type: "common",
    fields: [
      {
        name: "CLIP",
        description: "CLIP_stop_at_last_layers",
        type: "number",
        target: "override_settings.CLIP_stop_at_last_layers",
        min: 0,
        max: 10,
        recommendations: [0],
        options: [1, 2]
      },
      {
        name: "ENSD",
        description: "eta_noise_seed_delta",
        type: "number",
        target: "override_settings.eta_noise_seed_delta",
        min: 0,
        max: 100000,
        recommendations: [0],
        options: [31337]
      }
    ]
  }
];
