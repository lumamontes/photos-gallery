import clsx from "clsx";
import { ReactNode } from "react";


export interface ContainerProps {
    children?: ReactNode;
    className?:string
}

export default function Container({className, children}: ContainerProps) {
    return (
    <div
      className={clsx(
        "container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg",
        className
      )}>
      {children}
    </div>
  );
}