import { ComponentType, FC, Fragment, ReactElement, ReactNode } from 'react';
import Page404 from '../pages/404/404';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import { addKeys, modifyRouterProperties } from '../utils/utils';

interface RouteConfigInterface {
	key?: string;
	title?: string | FC;
	component?: FC | ReactElement | ReactNode | ComponentType;
	icon?: ReactNode;
	layout?: string | FC;
	exact?: boolean;
	path?: string;
	fullPath?: string;
	children?: RouteConfigInterface[];
	index?: boolean;
	isHideOnMenu?: boolean;
	isProtected?: boolean;
	nested?: boolean;
}

const page404: RouteConfigInterface = {
	title: '404',
	component: Page404,
	layout: Fragment,
	path: '*',
	isHideOnMenu: true,
};

const routes: RouteConfigInterface[] = [
	{
		title: 'Trang chủ',
		component: Home,
		path: '/',
		isProtected: true,
		index: true,
	},
	{
		title: 'Login',
		component: Login,
		path: '/login',
		children: [
			{
				title: 'Index',
				component: Login,
				isHideOnMenu: true,
				path: '',
			},
			{
				title: 'Items',
				component: Login,
				isHideOnMenu: true,
				path: ':id',
			},
		],
	},
	{
		...page404,
	},
];

const modifiedRouter: RouteConfigInterface[] = addKeys(
	modifyRouterProperties(routes, {}, ['isProtected']),
	'children',
);
console.log(modifiedRouter);
export { modifiedRouter, page404, routes };
export type { RouteConfigInterface };
