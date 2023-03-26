import { ElementType, Fragment, ReactElement, ReactNode } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import { modifiedRouter, RouteConfigInterface } from './routes';

interface ProtectedRouteProps {
	children: ReactElement;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
	return children || <Outlet />;
}

function renderRoutes(
	routes?: RouteConfigInterface[],
	parentKey?: string,
): ReactNode[] | undefined {
	return routes?.map((route) => {
		const ProtectedLayout = route.isProtected ? ProtectedRoute : Fragment;
		const Layout = route.layout || DefaultLayout || Fragment;
		const Page = route.component as ElementType;

		if (route.index === false && route.children) {
			return renderRoutes(route.children, parentKey);
		}

		const key = route.key || route.path;

		return route.children ? (
			<Route
				key={`${parentKey}-${key}`}
				path={route.path}
				element={
					route.nested ? (
						<ProtectedLayout>
							<Layout>
								<Page />
							</Layout>
						</ProtectedLayout>
					) : null
				}
			>
				{renderRoutes(route.children, parentKey)}
			</Route>
		) : (
			<Route
				key={key}
				index={route.index}
				path={route.path}
				element={
					Page ? (
						<ProtectedLayout>
							<Layout>
								<Page />
							</Layout>
						</ProtectedLayout>
					) : null
				}
			/>
		);
	});
}

function RenderRouter() {
	return <Routes>{renderRoutes(modifiedRouter)}</Routes>;
}

export default RenderRouter;
