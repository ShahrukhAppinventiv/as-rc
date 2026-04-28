import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import Sidebar from "../components/sidebar/Sidebar"
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import RouterFallback from "@components/router-fallback";

export const MainLayouts = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <div className="flex flex-col h-screen">

                {/* Header (Top) */}
                <Header setCollapsed={setCollapsed} />

                {/* Body (Sidebar + Content) */}
                <div className="flex  overflow-hidden">

                    {/* Sidebar */}
                    <Sidebar collapsed={collapsed} />

                    {/* Main Content */}
                    <div className="flex-1 overflow-auto bg-gray-100 p-4">
                        <ErrorBoundary FallbackComponent={RouterFallback}>
                            <Outlet />
                        </ErrorBoundary>
                    </div>

                </div>
            </div>
        </>
    )
}
