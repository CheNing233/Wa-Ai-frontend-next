import { ArrowLeftRight, PlusIcon } from "lucide-react";
import { Button } from "@heroui/button";

import ModelCard from "@/components/common/model-card.tsx";
import { GroupTitle } from "@/components/workbench/common/group-title.tsx";
import { ParamGroupConfig } from "@/app/param-form.ts";
import { FC } from "react";

interface ModelInputGroupProps {
  config?: ParamGroupConfig;
}

export const ModelInputGroup: FC<ModelInputGroupProps> = (
  { config }
) => {
  return (
    <div className={"flex flex-col gap-3"}>
      <GroupTitle
        subTitle={"选择一个或多个模型，模型决定生成图像的风格"}
        title={"模型选择"}
      />

      <ModelCard
        as={"card"}
        rightSlot={
          <div className={"text-xs opacity-75"}>
            <ArrowLeftRight className={"inline"} size={16} />&nbsp;更换底模
          </div>
        }
      />

      <Button
        className={"border-dotted"}
        startContent={<PlusIcon size={20} />}
        variant={"bordered"}
      >
        添加风格模型
      </Button>
    </div>
  );
};
