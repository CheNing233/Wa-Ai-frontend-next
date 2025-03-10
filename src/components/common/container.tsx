import { ReactNode } from "react";


export default function Container(
  {
    children,
    otherProps
  }: {
    children: ReactNode,
    otherProps?: any
  }
) {
  return (
    <section
      className={
        "w-full " +
        "flex flex-col items-center justify-center gap-4 " +
        "py-3 sm:py-6 md:py-8 " +
        "px-3 sm:px-8 md:px-10"
      }
      {...otherProps}
    >
      {children}
    </section>
  );
}
