import { useState, useEffect, ChangeEvent } from "react";

export default function DarkModeSwitch() {
    const [darkMode, setDarkMode] = useState(false);

    function updateDarkMode(event: ChangeEvent<HTMLInputElement>) {
        setDarkMode(event.target.checked);
    }

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    })

    return (
        <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" className="sr-only peer" onChange={updateDarkMode}/>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-400"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
        </label>
    )
}