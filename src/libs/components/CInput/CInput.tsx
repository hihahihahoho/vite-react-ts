import React from 'react';

import styles from './CInput.module.scss';

type Props = {
	example?: string;
};

export const CInput: React.FC<Props> = () => {
	return <div className={styles.wrap}>CInput</div>;
};
