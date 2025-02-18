"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { clsx } from "clsx";

export type Theme = "light" | "dark" | "system";  // Add "system" option

interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;  // Optional prop to set the default theme
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme ?? "system");

    // Check system theme on initial load
    useEffect(() => {
        // Else check localStorage and then system theme
        const storedTheme = localStorage.getItem("theme") as Theme | null;

        if (storedTheme) {
            // If defaultTheme is provided, use it
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";

            setTheme(storedTheme ?? systemTheme);
        } else {
            setTheme(theme);

        }
    }, [defaultTheme]);

    // Update the theme in the document and store it in localStorage
    useEffect(() => {
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            document.documentElement.setAttribute("data-theme", systemTheme);
            localStorage.setItem("theme", "system");
        } else {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={clsx(theme)}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
