import { createContext, useState } from "react";

export const LoaderContext = createContext<any>(null)

export const LoaderContextProvider = ({ children }: any) => {
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoaderContext.Provider>
    )
}