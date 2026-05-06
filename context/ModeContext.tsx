import React, { createContext, ReactNode, useContext, useState } from "react";

type ModeContextType = {
    isChatMode: boolean;
    toggleMode: () => void;
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
    const [isChatMode, setIsChatMode] = useState(true);

    const toggleMode = () => {
        setIsChatMode((prev) => !prev);
    };

    return (
        <ModeContext.Provider value={{ isChatMode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    );
};

export const useMode = () => {
    const context = useContext(ModeContext);
    if (context === undefined) {
        throw new Error("useMode must be used within a ModeProvider");
    }
    return context;
};
