import { ReactNode } from "react";

export const GroupTitle = (
  {
    title,
    subTitle
  }: {
    title: string | ReactNode,
    subTitle: string | ReactNode
  }
) => {
  return (
    <div className={"flex flex-col gap-1"}>
      <h2 className={"text-large"}>{title}</h2>
      <p className={"text-sm opacity-60"}>{subTitle}</p>
    </div>
  );
};
