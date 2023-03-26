import _ from 'lodash';
import { RouteConfigInterface } from '../routers/routes';

function addKeys<T>(arr: T[], childField: keyof T, parentKey?: string): T[] {
	return arr.map((obj, i) => {
		const key = parentKey ? `${parentKey}-${i}` : `${i}`;
		if (obj[childField]) {
			return {
				...obj,
				key,
				[childField]: addKeys(
					obj[childField] as unknown as T[],
					childField,
					key,
				),
			};
		}
		return { ...obj, key };
	});
}

export { addKeys };

export function removeTrailingSlash(str: string) {
	if (str.endsWith('/') && str.length > 1) {
		return str.slice(0, -1);
	}
	return str.replace('//', '/');
}

export function modifyRouterProperties(
	routes?: RouteConfigInterface[],
	parentRouteProp: RouteConfigInterface = {},
	includeProp: string[] = ['isProtected'],
	fullPath = true,
): RouteConfigInterface[] {
	if (!routes) {
		return [];
	}

	return routes.map((route) => {
		const parentPath = parentRouteProp.fullPath;

		if (fullPath && route.path) {
			route.fullPath = removeTrailingSlash(
				`/${parentPath ? `${parentPath}/` : ''}${route.path}`,
			);
		}
		if (route.path === '') {
			route.fullPath = removeTrailingSlash(
				`${parentPath ? `${parentPath}/` : ''}${route.path}`,
			);
		}
		if (route.index === true) {
			route.fullPath = removeTrailingSlash(
				`/${parentPath ? `${parentPath}` : `${route.path}`}`,
			);
		}
		const { ...routeProp } = route;
		let filteredObject = {};
		if (includeProp.length) {
			filteredObject = _.pick(parentRouteProp, includeProp);
		}
		route = { ...filteredObject, ...routeProp };

		if (route.children) {
			route.children = modifyRouterProperties(
				route.children,
				route,
				includeProp,
				fullPath,
			);
		}
		if (route.index === false && route.children) {
			route.children = route.children.map((child) => {
				child.path = `${route.path}/${child.path}`;
				return child;
			});
		}
		if (!route.component) {
			delete route.fullPath;
		}

		return route;
	});
}

export function uriToFile(uri: string, fileName: string): File {
	const byteString = atob(uri.split(',')[1]);
	const mimeString = uri.split(',')[0].split(':')[1].split(';')[0];
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < byteString.length; i += 1) {
		ia[i] = byteString.charCodeAt(i);
	}
	return new File([ab], fileName, { type: mimeString });
}

// write a function to turn object of objects to array of objects { key: 'key', value: 'value' }
export function objectToArray(obj: { [key: string]: string }) {
	return Object.keys(obj).map((key) => {
		return { key, value: obj[key] };
	});
}

export function isJson(str: string) {
	try {
		JSON.parse(str);
		return true;
	} catch (e) {
		return false;
	}
}
