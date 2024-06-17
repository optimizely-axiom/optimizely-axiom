import clsx from "clsx";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Textarea.css";

type TextareaProps = ExtendProps<
  ComponentPropsWithRef<"textarea">,
  ComponentPropsWithRef<typeof Box>,
  {
    autosize?: boolean;
    bottomSection?: ReactNode;
    defaultValue?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isResizeable?: boolean;
    topSection?: ReactNode;
  } & styles.ParentRecipeVariants &
    styles.TextAreaRecipeVariants
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      autosize,
      bottomSection,
      className,
      defaultValue,
      isDisabled,
      isInvalid,
      isResizeable = true,
      placeholder,
      rows,
      size,
      topSection,
      ...props
    },
    ref,
  ) => {
    const Component = autosize ? TextareaAutosize : "textarea";

    return (
      <Box
        aria-invalid={isInvalid}
        className={clsx(styles.parentBoxRecipe({}))}
        data-disabled={isDisabled}
        {...props}
        style={{
          resize: isResizeable ? "vertical" : "none",
        }}
      >
        {topSection && <Box>{topSection}</Box>}
        <Box asChild className={clsx(styles.textAreaBoxRecipe({}), className)}>
          <Box
            asChild
            style={{
              resize: "none", // Need to fix
            }}
          >
            <Component>
              {/* @ts-expect-error - Fix the reference  */}
              {/* ref={ref} */}
              defaultValue={defaultValue}
              placeholder={placeholder}
            </Component>
          </Box>
        </Box>
        {bottomSection && <Box>{bottomSection}</Box>}
      </Box>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
