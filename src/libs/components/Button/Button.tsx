import style from './Button.module.scss';

export interface ButtonProps {
	prop?: string;
}

export function Button({ prop = 'default value' }: ButtonProps) {
	return <div className={style.Button}>Button {prop}</div>;
}
