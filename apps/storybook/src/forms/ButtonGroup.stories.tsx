import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentPropsWithRef } from "react";

import { Button, ButtonGroup, Flex } from "@optiaxiom/react";
import { IconArrowRight, IconDownload, IconPhoto } from "@tabler/icons-react";

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

const Content = ({
  preset,
}: Pick<ComponentPropsWithRef<typeof Button>, "preset">) => (
  <>
    <Button leftSection={<IconPhoto size={16} />} preset={preset}>
      Gallery
    </Button>
    <Button preset={preset} rightSection={<IconDownload size={16} />}>
      Download
    </Button>
    <Button
      leftSection={<IconPhoto size={16} />}
      preset={preset}
      rightSection={<IconArrowRight size={16} />}
    >
      Enter Gallery
    </Button>
  </>
);

const BasicContent = ({
  children,
  ...props
}: Pick<
  ComponentPropsWithRef<typeof Button>,
  "children" | "colorScheme" | "preset" | "variant"
>) => (
  <>
    <Button {...props}>{children} One</Button>
    <Button {...props}>{children} Two</Button>
  </>
);

export const Horizontal: Story = {
  args: {
    children: <Content />,
  },
};

export const Vertical: Story = {
  args: {
    children: <Content />,
    orientation: "vertical",
  },
};

export const Spacing: Story = {
  args: {
    children: <Content />,
    gap: "8",
  },
};

const presets = [
  ["default", "Default"],
  ["primary", "Primary"],
  ["danger", "Danger"],
  ["danger-outline", "Outline"],
  ["secondary", "Secondary"],
] as const;

export const Presets: Story = {
  render: (args) => (
    <Flex alignItems="center">
      {presets.map(([preset, label]) => (
        <ButtonGroup {...args} key={preset}>
          <BasicContent preset={preset}>{label}</BasicContent>
        </ButtonGroup>
      ))}
      <ButtonGroup {...args}>
        <BasicContent colorScheme="danger" variant="ghost">
          Danger Secondary
        </BasicContent>
      </ButtonGroup>
    </Flex>
  ),
};

export const PresetsSpacing: Story = {
  args: {
    gap: "8",
  },
  render: (args) => (
    <Flex alignItems="center">
      {presets.map(([preset, label]) => (
        <ButtonGroup {...args} key={preset}>
          <BasicContent preset={preset}>{label}</BasicContent>
        </ButtonGroup>
      ))}
    </Flex>
  ),
};

export const OnlyChild: Story = {
  args: {
    children: <Button>Single Button</Button>,
  },
};
