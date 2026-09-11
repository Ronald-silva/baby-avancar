import { Slot } from "@radix-ui/react-slot";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type BaseProps = { children: ReactNode; className?: string };
type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; href?: never };
type LinkProps = BaseProps & { href: string; asChild?: never };

const buttonClassName = "tap-target inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 font-semibold text-brand-foreground shadow-soft transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:shadow-glass active:translate-y-0";

export function Button({ className, children, ...props }: ButtonProps | LinkProps) {
  if ("href" in props && props.href) {
    return <Link className={cn(buttonClassName, className)} href={props.href}>{children}</Link>;
  }

  const { asChild, type = "button", ...buttonProps } = props as ButtonProps;
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonClassName, className)} type={type} {...buttonProps}>{children}</Component>;
}
