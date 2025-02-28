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
    title: "Settings",
    description: "settings",
    type: "common",
    fields: [
      {
        name: "steps",
        type: "number",
        target: "steps",
        min: 1,
        max: 100,
        step: 1
      },
      {
        name: "cfg_scale",
        type: "number",
        target: "cfg_scale",
        min: 1,
        max: 30,
        step: 0.1
      },
      {
        name: "width",
        type: "number",
        target: "width",
        min: 512
      },
      {
        name: "height",
        type: "number",
        target: "height",
        min: 512
      }
    ]
  }
];
