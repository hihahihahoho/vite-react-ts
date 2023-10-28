import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Select } from '..';

const meta = {
	component: Select,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
	{
		title: 'Banana',
		value: 'Banana',
		sub: 'Banana Description',
	},
	{
		title: 'Apple',
		value: 'Apple',
		sub: 'Apple Description',
	},
	{
		title: 'Orange',
		value: 'Orange',
		sub: 'Orange Description',
	},
];

export const Default: Story = {
	args: {
		data: data,
	},
};

export const Debuger: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const submitButton = canvas.getByRole('combobox');

		await userEvent.click(submitButton);
		debugger;
	},
	args: {
		defaultValue: 'Banana',
		data: data,
	},
};
