"use client";

import {useState} from "react";
import Preloader from "@/components/pre-loader/preloader";
import ThemeSwitcher from "@/src/theme-switcher";




export default function Home() {
    const [value, setValue] = useState('');
  return (
    <div className="bg-gray-500 h-screen w-screen">
       <Preloader />
        <ThemeSwitcher />
    </div>
  );
}
