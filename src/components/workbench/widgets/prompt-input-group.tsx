import { Textarea } from "@heroui/input";
import { GroupTitle } from "@/components/workbench/common/group-title.tsx";
import { ParamGroupConfig } from "@/app/param-form.ts";
import { FC } from "react";

interface PromptInputGroupProps {
  config?: ParamGroupConfig;
}

export const PromptInputGroup: FC<PromptInputGroupProps> = (
  { config }
) => {
  return (
    <div className={"flex flex-col gap-3"}>
      <GroupTitle
        subTitle={"提示词，用于引导模型生成符合要求的图片"}
        title={"图片创意描述"}
      />

      <Textarea
        minRows={6}
        placeholder={"请使用多个「英文单词」来描述你想要生成的内容，并使用「英文逗号」隔开"}
      />
    </div>
  );
};
