import { useTI2I_ParamFormsStore } from "@/stores/paramFormStore.ts";

export const useParamFormsVM = () => {
  const forms = useTI2I_ParamFormsStore((state) => state.forms);
  const getCurrentFormItem = useTI2I_ParamFormsStore((state) => state.getCurrentFormItem);
  const updateCurrentFormItem = useTI2I_ParamFormsStore((state) => state.updateCurrentFormItem);

  return {
    forms,
    getCurrentFormItem,
    updateCurrentFormItem
  };
};
