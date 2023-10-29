import type { Meta, StoryObj } from '@storybook/react';
import { CInput } from '.';

const meta: Meta<typeof CInput> = {
	title: 'Components/CInput',
	component: CInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
	},
};

export default meta;
type Story = StoryObj<typeof CInput>;

export const Default: Story = {
	args: {
		// Props
	},
};
