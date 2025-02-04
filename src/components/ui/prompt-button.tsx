import { Card, CardBody, CardProps } from "@heroui/card";


export interface PromptButtonProps {
  primaryText: string;
  secondaryText: string;
  cardProps?: CardProps;
}

export default function PromptButton(
  {
    primaryText,
    secondaryText,
    cardProps
  }: PromptButtonProps
) {

  return (
    <Card
      isPressable={true}
      {...cardProps}
    >
      <CardBody className={"flex flex-col flex-nowrap justify-center px-2 py-1"}>
        <div className={"w-full text-center"}>
          {primaryText}
        </div>
        <div
          className={
            "opacity-75 relative overflow-visible " +
            "w-full text-center"
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
      </CardBody>
    </Card>
  );
}
