import { ParamFieldConfig, ParamGroupConfig } from "@/app/param-form.ts";
import { FC, useState } from "react";
import { GroupTitle } from "@/components/workbench/common/group-title.tsx";
import { Card, CardBody } from "@heroui/card";
import { useParamFormsVM } from "@/controller/useParamFormsVM.tsx";
import InputWithPopover from "@/components/workbench/common/autocomplete-popover.tsx";

interface CommonInputGroupProps {
  config: ParamGroupConfig;
}

interface CommonInputProps {
  config: ParamFieldConfig;
}

const CommonNumberInput: FC<CommonInputProps> = (
  { config }
) => {
  const { getCurrentFormItem, updateCurrentFormItem } = useParamFormsVM();

  const convertFunc = config.convert || (value => value);

  const [f, setF] = useState(false);

  // @ts-ignore
  return (
    <div className={"flex flex-row flex-nowrap items-center"}>

      <div className={"flex-1 text-wrap break-words"}>
        {config.name}
      </div>

      <div className={"basis-2/3 min-w-28"}>


        <div className={"relative w-full"}>
          {/*<Autocomplete*/}
          {/*  scrollShadowProps={{*/}
          {/*    isEnabled: true*/}
          {/*  }}*/}
          {/*  selectedKey={getCurrentFormItem(config.target)}*/}
          {/*  value={getCurrentFormItem(config.target)}*/}
          {/*  variant="bordered"*/}
          {/*  onValueChange={(value) => {*/}
          {/*    updateCurrentFormItem(config.target, convertFunc(value));*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <AutocompleteSection*/}
          {/*    title={(*/}
          {/*      <AutocompleteHelper*/}
          {/*        showDrag*/}
          {/*        showOptions*/}
          {/*        showRecommendations*/}
          {/*        showSlider*/}

          {/*        max={100}*/}
          {/*        min={0}*/}

          {/*        options={[10, 30, 70, 100]}*/}
          {/*        recommendations={[20, 50, 80]}*/}
          {/*        step={5}*/}

          {/*        value={getCurrentFormItem(config.target)}*/}
          {/*        onValueChange={(value) => {*/}
          {/*          updateCurrentFormItem(config.target, convertFunc(value));*/}
          {/*        }}*/}
          {/*      />*/}
          {/*    ) as any}*/}
          {/*  >*/}
          {/*    <AutocompleteItem key="none" className={"pointer-events-none"}>*/}
          {/*      <span className={"text-xs font-bold opacity-50"}>没有了喵~</span>*/}
          {/*    </AutocompleteItem>*/}
          {/*  </AutocompleteSection>*/}
          {/*</Autocomplete>*/}


          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          {/*<div autoFocus={false} tabIndex={-1}>*/}

          {/*    <div/>*/}
          {/*  </AutocompleteHelper>*/}
          {/*</div>*/}
          {/*<LegacyPopover*/}
          {/*  content={(*/}

          {/*  )}*/}
          {/*>*/}
          {/*  <Input*/}
          {/*    size={"sm"}*/}
          {/*    value={getCurrentFormItem(config.target)}*/}
          {/*    onFocusChange={setF}*/}
          {/*    onValueChange={(value) => {*/}
          {/*      updateCurrentFormItem(config.target, convertFunc(value));*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</LegacyPopover>*/}


          <InputWithPopover config={config}/>
        </div>
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
