import { Button, ButtonProps } from "@heroui/button";


export interface PromptButtonProps {
  primaryText: string;
  secondaryText: string;
  buttonProps?: ButtonProps;
}

export default function PromptButton(
  {
    primaryText,
    secondaryText,
    buttonProps
  }: PromptButtonProps
) {

  return (
    <Button
      {...buttonProps}
      className={"relative px-0 " + buttonProps?.className}
    >
      <div className={"w-full flex flex-col flex-nowrap justify-center px-2 py-1"}>
        <div className={"w-full text-center px-2"}>
          {primaryText}
        </div>
        <div
          className={
            "opacity-75 relative overflow-visible " +
            "w-full text-center px-2"
          }
        >
          {secondaryText}
          <div
            className={
              "absolute top-0 -left-2 -right-2 -bottom-1 " +
              "bg-foreground-100 opacity-100 -z-10"
            }
          />
        </div>
      </div>
    </Button>
  );
}
