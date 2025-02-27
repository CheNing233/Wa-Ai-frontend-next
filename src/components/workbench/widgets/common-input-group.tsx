import { FieldConfig, FieldGroupConfig } from "@/app/param-form.ts";
import { FC, useEffect } from "react";
import { GroupTitle } from "@/components/workbench/common/group-title.tsx";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useParamFormsVM } from "@/controller/useParamFormsVM.tsx";

interface CommonInputGroupProps {
  config: FieldGroupConfig;
}

interface CommonInputProps {
  config: FieldConfig;
}

const CommonNumberInput: FC<CommonInputProps> = (
  { config }
) => {
  const { forms, getCurrentFormItem, updateCurrentFormItem } = useParamFormsVM();

  useEffect(() => {
    console.log(getCurrentFormItem(config.target), forms);
  }, [forms]);

  return (
    <div className={"flex flex-row flex-nowrap items-center"}>

      <div className={"flex-1 text-wrap break-words"}>
        {config.name}
      </div>

      <div className={"basis-1/2 min-w-28"}>
        <Input
          size={"sm"}
          value={getCurrentFormItem(config.target)}
          onValueChange={(value) => {
            updateCurrentFormItem(config.target, value);
          }}
        />
      </div>
    </div>
  );
};

const InputMap: any = {
  number: CommonNumberInput
};


export const CommonInputGroup: FC<CommonInputGroupProps> = (
  { config }
) => {
  return (
    <div className={"flex flex-col gap-3"}>
      <GroupTitle
        subTitle={config.description}
        title={config.title}
      />

      <Card>
        <CardBody className={"flex flex-col gap-3"}>
          {config.fields.map((field) => {

            const Component = InputMap[field.type] || null;

            return (
              <Component key={field.name} config={field} />
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
};
