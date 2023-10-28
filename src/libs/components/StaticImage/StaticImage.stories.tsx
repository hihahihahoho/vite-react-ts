import type { Meta, StoryObj } from '@storybook/react';
import { StaticImage } from './StaticImage';

const meta = {
	component: StaticImage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof StaticImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		src: 'assets/patern/bill-header-pattern.jpg',
	},
};
