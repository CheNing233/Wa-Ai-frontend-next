import { FC } from "react";
import { ParamFormConfig } from "@/app/param-form.ts";
import { ModelInputGroup } from "@/components/workbench/widgets/model-input-group.tsx";
import { PromptInputGroup } from "@/components/workbench/widgets/prompt-input-group.tsx";
import { CommonInputGroup } from "@/components/workbench/widgets/common-input-group.tsx";


interface ParamFormRendererProps {
  formConfig: ParamFormConfig;
}

export const ParamFormRenderer: FC<ParamFormRendererProps> = (
  { formConfig }
) => {

  return formConfig.map((group) => {
    switch (group.type) {
      case "model":
        return <ModelInputGroup key={group.title} config={group} />;
      case "prompt":
        return <PromptInputGroup key={group.title} config={group} />;
      case "common":
        return <CommonInputGroup key={group.title} config={group} />;
    }
  });
};
