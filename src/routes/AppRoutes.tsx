import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { RoutesApp, GlobalError, GlobalLoading } from "./autoRoutes";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function AppRoutes() {
  const validRoutes = RoutesApp;


  // Redirect to login if not authenticated, otherwise to home
  const defaultRedirect = "/login";

  return (
    <Routes>
      {/* Redirect default route */}
      {["/", "*", "404", "500"].map((redirectPath) => (
        <Route
          key={redirectPath}
          path={redirectPath}
          element={
            <Navigate
              to={defaultRedirect}
              replace
            />
          }
        />
      ))}

      {/* Valid Routes */}
      {validRoutes.map((route, index) => {
        const LazyPage = route?.element;
        const LayoutLoader = route?.layout ? lazy(route?.layout) : null;

        const PageWithLayout = LayoutLoader ? (
          <LayoutLoader>
            <LazyPage />
          </LayoutLoader>
        ) : (
          <LazyPage />
        );

        return (
          <Route
            key={index}
            path={route?.path}
            element={
              <Suspense fallback={<GlobalLoading />}>
                <ErrorBoundary fallback={<GlobalError />}>
                  {PageWithLayout}
                </ErrorBoundary>
              </Suspense>
            }
          />
        );
      })}
    </Routes>
  );
}
