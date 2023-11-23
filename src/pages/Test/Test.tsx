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
	const [checkboxState, setCheckboxState] = useState(checkBox);
	const [checkboxAllState, setCheckboxAllState] = useState(
		checkBox.every((item) => item.value),
	);
	const displayCheckbox = arrayToDeepArray(checkBox, 'id');
	console.log(displayCheckbox);
	const handleCheckboxChange = (
		itemName: ICheckBox['id'],
		e: ChangeEvent<HTMLInputElement>,
	) => {
		const checked = e.target.checked;
		const newCheckBoxState = checkboxState.map((item) => {
			if (item.id === itemName) {
				return { ...item, value: checked };
			}
			return item;
		});
		setCheckboxState(newCheckBoxState);
		setCheckboxAllState(newCheckBoxState.every((item) => item.value));
	};

	const handleCheckBoxAllChange = (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		const newCheckBoxState = checkboxState.map((item) => {
			return { ...item, value: checked };
		});
		setCheckboxState(newCheckBoxState);
		setCheckboxAllState(checked);
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
			<ul>
				{checkboxState.map((item) => {
					return (
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
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default Test;
