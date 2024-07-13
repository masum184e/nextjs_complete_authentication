import { createContext, useState } from "react";

export const ImplementContext = createContext(null)

const Provider = ({ children }) => {
    const [loader, setLoader] = useState(false);

    const contextValue = {
        loader,
        setLoader,
    }

    return (
        <ImplementContext.Provider value={contextValue}>{children}</ImplementContext.Provider>
    )
}

export default Provider
