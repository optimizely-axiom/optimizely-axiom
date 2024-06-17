import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, Text, Textarea } from "@optiaxiom/react";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  title: "Components / Textarea",
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  args: {
    isResizeable: false,
    placeholder: "Write your text",
  },
};
export const Highlight: Story = {
  args: {
    placeholder: "Write your text",
  },
};
export const Custom: Story = {
  args: {
    bottomSection: <Button>Bottom</Button>,
    placeholder: "Write your text",
    topSection: <Text>Sample</Text>,
  },
};
export const AutoResizeable: Story = {
  args: {
    autoResize: true,
    placeholder: "Write your text",
  },
};

export const TypesOfTextarea: Story = {
  render: () => (
    <Flex flexDirection="column" gap="xl">
      <Textarea
        defaultValue="Disabled with value"
        isDisabled={true}
        placeholder="Disabled placeholder"
      />

      <Textarea isDisabled={true} placeholder="Disabled placeholder" />
      <Textarea isInvalid={true} placeholder="Error state" />
      <Textarea
        defaultValue="Error with value"
        isInvalid={true}
        placeholder="Error with value"
      />

      <Textarea isDisabled={false} placeholder="Placeholder" />

      <Textarea
        defaultValue="This is a text Textarea"
        placeholder="Placeholder"
      />
    </Flex>
  ),
};
