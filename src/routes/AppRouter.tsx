import { Route, Routes } from "react-router-dom"
import { AuthLayouts } from "../layouts/AuthLayouts"
import { MainLayouts } from "../layouts/MainLayouts"
import { PrivateRoute } from "./PrivateRoute"
import { privateRouteList, publicRouteList } from "./route.config"
import PublicRoute from "./PublicRoute"
import NotFound from "../pages/NotFound/NotFound"

export const AppRouter = () => {
    const renderRoutes = (routes: any[]) =>
        routes.map((route, index) => {
            if (route.index) {
                return (
                    <Route
                        key={index}
                        index
                        element={route.element}
                    />
                );
            }
            return (
                <Route key={index} path={route.path} element={route.element}>
                    {route.children && renderRoutes(route.children)}
                </Route>
            );
        });
    return (
        <>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<AuthLayouts />}>
                        {publicRouteList.map((route, index) => <Route key={index} path={route.path} element={route.element} index={route.index} />)}
                    </Route>
                </Route>
                {/* <Route element={<PrivateRoute />}>
                    <Route element={<MainLayouts />}>
                        {privateRouteList.map((route, index) => <Route key={index} path={route.path} element={route.element} />)}
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} /> */}
                <Route element={<PrivateRoute />}>
                    <Route element={<MainLayouts />}>
                        {renderRoutes(privateRouteList)}
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />

            </Routes>
        </>
    )
}
