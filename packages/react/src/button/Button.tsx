import { Slot, Slottable } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithRef,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Text } from "../text";
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
    icon?: ReactNode;
    iconPosition?: "end" | "start";
    isLoading?: boolean;
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
      icon,
      iconPosition = "start",
      isLoading,
      onClick,
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

    let content;
    if (children) {
      children =
        asChild && isValidElement(children) ? (
          cloneElement(
            children,
            undefined,
            <Text
              as="span"
              fontSize="inherit"
              style={{
                padding: "0px 4px",
              }}
            >
              {children.props.children}
            </Text>,
          )
        ) : (
          <Text as="span" fontSize="inherit">
            {children}
          </Text>
        );

      content = (
        <>
          {icon && iconPosition === "start" && (
            <Box {...styles.section({ position: iconPosition, size: size })}>
              {icon}
            </Box>
          )}
          <Slottable>{children}</Slottable>
          {icon && iconPosition === "end" && (
            <Box {...styles.section({ position: iconPosition, size: size })}>
              {icon}
            </Box>
          )}
        </>
      );
    }

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
        <Comp ref={ref}>{content}</Comp>
      </Box>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
