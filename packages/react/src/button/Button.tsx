import { Slot, Slottable } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Button.css";

const appearances = {
  danger: { colorScheme: "danger", variant: "solid" },
  "danger-outline": { colorScheme: "danger", variant: "outline" },
  default: { colorScheme: "secondary", variant: "outline" },
  primary: { colorScheme: "primary", variant: "solid" },
  secondary: { colorScheme: "secondary", variant: "ghost" },
} satisfies Record<string, styles.ButtonVariants>;

type ButtonProps = ExtendProps<
  ComponentPropsWithRef<"button">,
  ComponentPropsWithRef<typeof Box>,
  {
    appearance?: keyof typeof appearances;
    children?: ReactNode;
    disabled?: boolean;
    isLoading?: boolean;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
  } & styles.ButtonVariants
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      appearance = "default",
      asChild,
      children,
      className,
      colorScheme,
      disabled,
      isLoading,
      leftSection,
      onClick,
      rightSection,
      size = "md",
      variant,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const presetProps = appearances[appearance];
    const finalColorScheme = colorScheme ?? presetProps.colorScheme;
    const finalVariant = variant ?? presetProps.variant;

    const isDisabled = disabled || isLoading;

    return (
      <Box
        aria-disabled={isDisabled}
        asChild
        data-disabled={isDisabled}
        onClick={isDisabled ? undefined : onClick}
        {...styles.button(
          {
            colorScheme: finalColorScheme,
            size,
            variant: finalVariant,
          },
          className,
        )}
        {...props}
      >
        <Comp ref={ref}>
          {leftSection}
          <Slottable>{children}</Slottable>
          {rightSection}
        </Comp>
      </Box>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
