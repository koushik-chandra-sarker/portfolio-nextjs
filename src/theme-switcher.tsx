// src/components/theme-switcher.tsx
"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {useTheme} from "@/src/providers/theme-provider";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const themes = ["light", "dark", "system"] as const;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Theme: {theme}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {themes.map((t) => (
                    <DropdownMenuItem key={t} onClick={() => setTheme(t)}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
