import { useTI2I_ParamFormsStore } from "@/stores/paramFormStore.ts";

export const useParamFormsVM = () => {
  const forms = useTI2I_ParamFormsStore((state) => state.forms);
  const currentId = useTI2I_ParamFormsStore((state) => state.currentId);
  const setCurrentId = useTI2I_ParamFormsStore((state) => state.setCurrentId);
  const getCurrentFormItem = useTI2I_ParamFormsStore((state) => state.getCurrentFormItem);
  const updateCurrentFormItem = useTI2I_ParamFormsStore((state) => state.updateCurrentFormItem);

  return {
    forms,
    currentId,
    setCurrentId,
    getCurrentFormItem,
    updateCurrentFormItem
  };
};
