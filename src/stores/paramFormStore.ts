import { create } from "zustand";
import { persist } from "zustand/middleware";
import { get as loGet, set as loSet } from "lodash";
import { getChineseDateTime } from "@/utils/tools.ts";

export type Txt2ImgParamType = {
  prompt: string;
  steps: number;
  seed: number;
  sampler_name: string;
  cfg_scale: number;
  width: number;
  height: number;
  negative_prompt: string;
  enable_hr: boolean;
  denoising_strength: number;
  n_iter: number;
  hr_scale: number;
  hr_upscaler: string;
  hr_second_pass_steps: number;
  override_settings: {
    sd_model_checkpoint: string;
    sd_vae: string;
    CLIP_stop_at_last_layers: number;
    eta_noise_seed_delta: number;
  };
  alwayson_scripts: any;
};

export type Img2ImgParamType = {
  prompt: string;
  steps: number;
  seed: number;
  sampler_name: string;
  cfg_scale: number;
  width: number;
  height: number;
  negative_prompt: string;
  denoising_strength: number;
  n_iter: number;
  override_settings: {
    sd_model_checkpoint: string;
    sd_vae: string;
    CLIP_stop_at_last_layers: number;
    eta_noise_seed_delta: number;
  };
  restore_faces: boolean;
  tiling: boolean;
  resize_mode: number;
  mask: string | null;
  mask_blur: number;
  inpainting_fill: number;
  inpaint_full_res: boolean;
  inpaint_full_res_padding: number;
  inpainting_mask_invert: number;
  initial_noise_multiplier: 1 | number;
  init_images: string | string[];

  scaleByOriginal?: boolean;
  scaleNumber?: number;
  allowMask?: boolean;
  alwayson_scripts: any;
};


export interface ParamFormType {
  id: string;
  alias: string;
  type: "txt2img" | "img2img" | "extra";
  createdAt: string;
  modifiedAt: string;
  formContent: Txt2ImgParamType | Img2ImgParamType;
}

interface TI2I_ParamFormsStoreState {
  forms: ParamFormType[];
  currentId: string | null;
}

interface TI2I_ParamFormsStoreActions {
  setCurrentId: (id: string | null) => void;
  addForm: (form: ParamFormType) => void;
  updateCurrentFormItem: (path: string, value: any) => void;
  getCurrentFormItem: (path: string) => any;
}

export const useTI2I_ParamFormsStore = create(
  persist<TI2I_ParamFormsStoreState & TI2I_ParamFormsStoreActions>(
    (set, get) => ({
      // 初始状态（当 localStorage 为空时使用）
      forms: [],
      currentId: null,

      // 设置当前选中 ID
      setCurrentId: (id) => set({ currentId: id }),

      addForm: (form) => {
        const state = get();
        const updatedForms = [...state.forms];

        updatedForms.unshift(form);
        set({ forms: updatedForms });
      },

      // 使用 lodash.set 更新当前对象
      updateCurrentFormItem: (path, value) => {
        const state = get();

        if (!state.currentId) return;

        const itemIndex = state.forms.findIndex(
          (form) => form.id === state.currentId
        );

        if (itemIndex === -1) return;

        // 使用 lodash 的 set 方法进行深层次更新
        const updatedForms = [...state.forms];

        loSet(updatedForms[itemIndex].formContent, path, value);
        updatedForms[itemIndex].modifiedAt = getChineseDateTime(new Date());

        set({ forms: updatedForms });
      },

      getCurrentFormItem: (path) => {
        const state = get();

        if (!state.currentId) {
          console.error("[getCurrentFormItem] No currentId found.");

          return;
        }

        const itemIndex = state.forms.findIndex(
          (form) => form.id === state.currentId
        );

        if (itemIndex === -1) {
          console.error("[getCurrentFormItem] No form found with currentId.");

          return;
        }

        // 使用 lodash 的 get 方法进行深层次获取
        return loGet(state.forms[itemIndex].formContent, path);
      }
    }),
    {
      name: "TI2I-ParamFormsStore",// localStorage 的键名
      // 持久化配置
      onRehydrateStorage: () => (state) => {
        // 当从 localStorage 恢复数据后
        if (state && state.forms.length > 0) {
          // 确保至少选中第一个对象
          if (!state.currentId) {
            state.currentId = state.forms[0].id;
          }
        }
      }
    }
  )
);
