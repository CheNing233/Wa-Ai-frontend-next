import { ParamFieldConfig, ParamGroupConfig } from "@/app/param-form.ts";
import React, { FC, useState } from "react";
import { GroupTitle } from "@/components/workbench/common/group-title.tsx";
import { Card, CardBody } from "@heroui/card";
import { useParamFormsVM } from "@/controller/useParamFormsVM.tsx";
import NativePopover from "@/components/common/native-popover.tsx";
import AutocompleteHelper from "@/components/workbench/common/autocomplete-helper.tsx";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { Radio, RadioGroup } from "@heroui/radio";


interface CommonInputGroupProps {
  config: ParamGroupConfig;
}

interface CommonInputProps {
  config: ParamFieldConfig;
}

const Title = (
  { title, subTitle }: { title: string, subTitle?: string }
) => {
  return (
    <div className={"flex-1 flex flex-col flex-wrap break-words"}>
      <span className={"text-sm font-semibold text-wrap break-words"}>{title}</span>
      {subTitle && <span className={"text-xs opacity-50"}>{subTitle}</span>}
    </div>
  );
};

const CommonNumberInput: FC<CommonInputProps> = (
  { config }
) => {
  const { getCurrentFormItem, updateCurrentFormItem } = useParamFormsVM();

  const convertFunc = config.convert || (value => value);
  const [innerValue, setInnerValue] = useState(getCurrentFormItem(config.target));

  return (
    <div className={"flex flex-row gap-2 flex-nowrap items-center"}>
      <Title subTitle={config.description} title={config.name}/>

      <div className={"basis-2/3 min-w-28"}>
        <div className={"relative w-full"}>
          <NativePopover
            content={(
              <AutocompleteHelper
                showDrag
                showOptions
                showRecommendations
                showSlider

                max={config.max}
                min={config.min}
                options={config.options}
                recommendations={config.recommendations}
                step={config.step}

                syncValue={innerValue}
                type={"number"}
                value={getCurrentFormItem(config.target)}
                onValueChange={(value: number | string) => {
                  updateCurrentFormItem(config.target, value);
                }}
              />
            )}
          >
            {
              (outerInputRef, setIsPopoverOpen) => (
                <Input
                  ref={outerInputRef}
                  readOnly={false}
                  size={"sm"}
                  value={getCurrentFormItem(config.target)}
                  onFocus={() => setIsPopoverOpen(true)}
                  onValueChange={(value: any) => {
                    updateCurrentFormItem(config.target, convertFunc(value));
                    setInnerValue(value);
                  }}
                />
              )
            }
          </NativePopover>
        </div>
      </div>
    </div>
  );
};

const CommonSelectInput: FC<CommonInputProps> = (
  { config }
) => {
  const { getCurrentFormItem, updateCurrentFormItem } = useParamFormsVM();

  const convertFunc = config.convert || (value => value);
  const [innerValue, setInnerValue] = useState(getCurrentFormItem(config.target));

  return (
    <div className={"flex flex-row gap-2 flex-nowrap items-center"}>
      <Title subTitle={config.description} title={config.name}/>

      <div className={"basis-2/3 min-w-28"}>
        <div className={"relative w-full"}>
          <NativePopover
            content={(
              <AutocompleteHelper
                showOptions
                showRecommendations

                options={config.options}
                recommendations={config.recommendations}

                syncValue={innerValue}
                type={"string"}
                value={getCurrentFormItem(config.target)}
                onValueChange={(value: number | string) => {
                  updateCurrentFormItem(config.target, value);
                }}
              />
            )}
          >
            {
              (outerInputRef, setIsPopoverOpen) => (
                <Input
                  ref={outerInputRef}
                  readOnly={true}
                  size={"sm"}
                  value={getCurrentFormItem(config.target)}
                  onFocus={() => setIsPopoverOpen(true)}
                  onValueChange={(value: any) => {
                    updateCurrentFormItem(config.target, convertFunc(value));
                    setInnerValue(value);
                  }}
                />
              )
            }
          </NativePopover>
        </div>
      </div>
    </div>
  );
};

const CommonBooleanInput: FC<CommonInputProps> = (
  { config }
) => {
  const { getCurrentFormItem, updateCurrentFormItem } = useParamFormsVM();

  const convertFunc = config.convert || (value => value);

  return (
    <div className={"flex flex-row gap-2 flex-nowrap items-center"}>
      <Title subTitle={config.description} title={config.name}/>

      <div className={"shrink"}>
        <div className={"relative"}>
          <Switch
            size={"sm"}
            value={getCurrentFormItem(config.target)}
            onValueChange={(value: boolean) => {
              updateCurrentFormItem(config.target, convertFunc(value));
            }}
          />
        </div>
      </div>
    </div>
  );
};

const CommonRadioInput: FC<CommonInputProps> = (
  { config }
) => {
  const { getCurrentFormItem, updateCurrentFormItem } = useParamFormsVM();

  const convertFunc = config.convert || (value => value);

  return (
    <div className={"flex flex-row gap-2 flex-nowrap items-center"}>
      <Title subTitle={config.description} title={config.name}/>

      <div className={"shrink"}>
        <div className={"relative"}>
          {/*<Switch*/}
          {/*  size={"sm"}*/}
          {/*  value={getCurrentFormItem(config.target)}*/}
          {/*  onValueChange={(value: boolean) => {*/}
          {/*    updateCurrentFormItem(config.target, convertFunc(value));*/}
          {/*  }}*/}
          {/*/>*/}

          <RadioGroup label="Select your favorite city" orientation="horizontal">
            <Radio value="buenos-aires">Buenos Aires</Radio>
            <Radio value="sydney">Sydney</Radio>
            <Radio value="san-francisco">San Francisco</Radio>
            <Radio value="london">London</Radio>
            <Radio value="tokyo">Tokyo</Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

const InputMap: any = {
  number: CommonNumberInput,
  boolean: CommonBooleanInput,
  select: CommonSelectInput,
  radio: CommonRadioInput
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
