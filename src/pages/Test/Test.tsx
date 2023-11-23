import React, { ChangeEvent, useState } from 'react';

import './Test.scss';

type Props = {
	example?: string;
};

interface ICheckBox {
	label: string;
	id: string;
	value: boolean;
	parent?: string;
	children?: ICheckBox[];
}

const checkBox: ICheckBox[] = [
	{
		label: 'Vietnam',
		id: 'VN',
		value: true,
		parent: 'Asia',
	},
	{
		label: 'Asia',
		id: 'Asia',
		value: true,
		parent: 'World',
	},
	{
		label: 'Thai Lan',
		id: 'TL',
		value: true,
		parent: 'Asia',
	},
	{
		label: 'World',
		id: 'World',
		value: true,
	},
	{
		label: 'Germany',
		id: 'GR',
		value: true,
		parent: 'Europe',
	},
	{
		label: 'United Kingdom',
		id: 'UK',
		value: true,
		parent: 'Europe',
	},
	{
		label: 'Europe',
		id: 'Europe',
		value: true,
		parent: 'World',
	},
];

interface HierarchicalData<T> {
	parent?: string;
	children?: T[];
}

const updateCheckboxState = (
	items: ICheckBox[],
	itemName: string,
	checked: boolean,
): ICheckBox[] => {
	return items.map((item) => {
		// If this is the item that was changed, or if it has children that might need updates
		if (item.id === itemName || (item.children && item.children.length > 0)) {
			// Determine the new value for 'value' property
			const newValue = item.id === itemName ? checked : item.value;
			// Update children if any
			const children = item.children
				? updateCheckboxState(item.children, itemName, checked)
				: [];

			return {
				...item,
				value: newValue,
				children: children,
			};
		} else {
			// If it's not the changed item and it doesn't have children, return it unchanged
			return item;
		}
	});
};

const arrayToDeepArray = <T extends HierarchicalData<T>>(
	arr: T[],
	nameKey: keyof T,
): T[] => {
	const resultMap = new Map<string, T & { children?: T[] }>();

	// First, map all items by their identifier for easy access.
	arr.forEach((item) => {
		const name = item[nameKey] as unknown as string; // Assuming the identifier is always a string.
		resultMap.set(name, { ...item, children: [] });
	});

	// Then, build the hierarchy by assigning children to their parents.
	arr.forEach((item) => {
		const parentName = item.parent;
		const childName = item[nameKey] as unknown as string;
		if (parentName && resultMap.has(parentName) && resultMap.has(childName)) {
			const parent = resultMap.get(parentName);
			const child = resultMap.get(childName);
			if (parent && child) {
				parent.children = parent.children || [];
				parent.children.push(child);
			}
		}
	});

	// Finally, filter out the items that are not top-level.
	return Array.from(resultMap.values()).filter((item) => !item.parent);
};

export const Test: React.FC<Props> = () => {
	const [checkboxState, setCheckboxState] = useState(
		arrayToDeepArray(checkBox, 'id'),
	);
	const [checkboxAllState, setCheckboxAllState] = useState(
		checkBox.every((item) => item.value),
	);
	const handleCheckboxChange = (
		itemName: ICheckBox['id'],
		e: ChangeEvent<HTMLInputElement>,
	) => {
		const checked = e.target.checked;
		const newCheckboxState = updateCheckboxState(
			checkboxState,
			itemName,
			checked,
		);
		console.log(newCheckboxState);
		setCheckboxState(newCheckboxState);
		setCheckboxAllState(newCheckboxState.every((item) => item.value));
	};

	const handleCheckBoxAllChange = (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		const newCheckboxState = updateAll(checkboxState, checked);
		setCheckboxState(newCheckboxState);
		setCheckboxAllState(checked);
	};

	const updateAll = (items: ICheckBox[], checked: boolean): ICheckBox[] => {
		return items.map((item) => ({
			...item,
			value: checked,
			children: item.children ? updateAll(item.children, checked) : [],
		}));
	};

	const renderCheckboxTree = (items: ICheckBox[]) => {
		return items.map((item) => (
			<li key={item.id}>
				<label>
					<input
						onChange={(e) => handleCheckboxChange(item.id, e)}
						type="checkbox"
						name={item.id}
						checked={item.value}
					/>
					{item.label}
				</label>
				{item.children && item.children.length > 0 && (
					<ul className="pl-4">{renderCheckboxTree(item.children)}</ul>
				)}
			</li>
		));
	};

	return (
		<div className="wrap container m-auto py-8">
			<label>
				<input
					onChange={handleCheckBoxAllChange}
					type="checkbox"
					name="checkboxAll"
					checked={checkboxAllState}
				/>
				Select all
			</label>
			<ul>{renderCheckboxTree(checkboxState)}</ul>
		</div>
	);
};
export default Test;
