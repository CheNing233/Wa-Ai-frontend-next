import { useTI2I_ParamFormsStore } from "@/stores/paramFormStore.ts";
import { useEffect, useState } from "react";
import { app } from "@/app/app.tsx";

export const useParamFormsVM = () => {
  const forms = useTI2I_ParamFormsStore((state) => state.forms);
  const currentId = useTI2I_ParamFormsStore((state) => state.currentId);
  const setCurrentId = useTI2I_ParamFormsStore((state) => state.setCurrentId);
  const getCurrentFormItem = useTI2I_ParamFormsStore((state) => state.getCurrentFormItem);
  const updateCurrentFormItem = useTI2I_ParamFormsStore((state) => state.updateCurrentFormItem);

  useEffect(() => {
    if (forms.length === 0) {
      app.params.createForm("txt2img");
    }
  }, []);

  // useEffect(() => {
  //   if (currentId == null) {
  //     setCurrentId(forms[0].id);
  //   }
  // }, [forms]);

  return {
    forms,
    getCurrentFormItem,
    updateCurrentFormItem,
  };
};
