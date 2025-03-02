import { ReactNode } from "react";
import { Spinner } from "@heroui/react";

export const SpinWrapper = (
  {
    children,
    isLoading = false,
    cursor = "default"
  }: {
    children: ReactNode,
    isLoading?: boolean
    cursor?: "not-allowed" | "default"
  }
) => {
  return (
    <div className="w-full h-full" tabIndex={-1}>
      {isLoading && <div className={
        "absolute w-full h-full bg-black opacity-50 z-10 " +
        `cursor-${cursor}`
      }>
        <Spinner
          className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}
        />
      </div>}
      {children}
    </div>
  );
};
