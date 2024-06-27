import type { Meta, StoryObj } from "@storybook/react";

import { FileUploader } from "@optiaxiom/react";

const meta: Meta<typeof FileUploader> = {
  component: FileUploader,
};

export default meta;

type Story = StoryObj<typeof FileUploader>;

export const Primary: Story = {
  args: {},
};
