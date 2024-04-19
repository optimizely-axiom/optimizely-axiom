import * as RadixTooltip from "@radix-ui/react-tooltip";
import {
  type ComponentProps,
  type ReactNode,
  forwardRef,
  useState,
} from "react";

import { Box } from "../box";
import { Text } from "../text";
import { Transition, TransitionTarget } from "../transition";

type TooltipProps = {
  children: ReactNode;
  content?: ReactNode;
  withArrow?: boolean;
} & ComponentProps<typeof RadixTooltip.Content>;

export const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>(
  ({ children, content, withArrow, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <RadixTooltip.Provider>
        <RadixTooltip.Root onOpenChange={setOpen} open={open}>
          <RadixTooltip.Trigger asChild ref={ref}>
            {children}
          </RadixTooltip.Trigger>

          <Transition open={open}>
            {(tProps) => (
              <RadixTooltip.Portal forceMount>
                <TransitionTarget {...tProps} type="pop">
                  <RadixTooltip.Content asChild sideOffset={5} {...props}>
                    <Box
                      background="dark.600"
                      borderRadius="sm"
                      color="white"
                      paddingX={0.75}
                      paddingY={0.5}
                    >
                      <Text size="sm">{content}</Text>
                      {withArrow && <RadixTooltip.Arrow />}
                    </Box>
                  </RadixTooltip.Content>
                </TransitionTarget>
              </RadixTooltip.Portal>
            )}
          </Transition>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    );
  },
);

Tooltip.displayName = "@optiaxiom/react/Tooltip";
