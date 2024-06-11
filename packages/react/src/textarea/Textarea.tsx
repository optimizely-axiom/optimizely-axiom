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
    autoResize?: boolean;
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
      autoResize,
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
    return (
      <Box
        aria-invalid={isInvalid}
        border="1"
        className={clsx(styles.parentBoxRecipe({}))}
        data-disabled={isDisabled}
        {...props}
        style={{
          resize: isResizeable ? "both" : "none",
        }}
      >
        {topSection && <Box>{topSection}</Box>}
        <Box asChild className={clsx(styles.textAreaBoxRecipe({}), className)}>
          {autoResize ? (
            <TextareaAutosize
              defaultValue={defaultValue}
              placeholder={placeholder}
              ref={ref}
              style={
                {
                  // resize: "none", // Need to fix
                }
              }
            ></TextareaAutosize>
          ) : (
            <textarea
              defaultValue={defaultValue}
              placeholder={placeholder}
              ref={ref}
              rows={rows}
              style={{
                resize: "none",
              }}
            ></textarea>
          )}
        </Box>
        {bottomSection && <Box>{bottomSection}</Box>}
      </Box>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
