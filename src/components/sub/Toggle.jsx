'use client';
import { moonIcon, sunIcon } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { motion } from "framer-motion";
const Toggle = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(true);
    const mainRef = useRef(null);
    const addDarkTheme = () => {
        mainRef.current.classList.add('dark');
        setDarkTheme(true);
    };
    const removeDarkTheme = () => {
        mainRef.current.classList.remove('dark');
        setDarkTheme(false);
    };

    useEffect(() => {
        const storedTheme = reactLocalStorage.get('darktheme');
        const darkThemeParsed = storedTheme !== undefined && JSON.parse(storedTheme);
        const systemTheme = typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme:dark)").matches;

        if (storedTheme === undefined) {
            // Set default theme based on the system preference
            systemTheme ? addDarkTheme() : removeDarkTheme();
        } else {
            // Use the stored theme preference
            darkThemeParsed ? addDarkTheme() : removeDarkTheme();
        }
    }, []);

    return (
        <main ref={mainRef}>
            <div className="bg-zinc-50 dark:bg-zinc-800">
                <div className="max-w-[1200px] xl:w-full mx-auto flex justify-center xl:px-[90px] sm:pl-[80px] sm:pr-5 overflow-hidden">
                    <button onClick={() => {
                        if (!darkTheme) {
                            addDarkTheme();
                            reactLocalStorage.set('darktheme', true);
                        } else {
                            removeDarkTheme();
                            reactLocalStorage.set('darktheme', false);
                        }
                    }} className="fixed right-14 sm:right-10 top-10 text-yellow-600 hover:text-yellow-500 z-40">
                        <motion.span animate={{ scale: darkTheme ? 0 : 1 }} className="absolute block rounded-full bg-zinc p-1 text-4xl dark:bg-zinc-800">{moonIcon}</motion.span>
                        <motion.span animate={{ scale: darkTheme ? 1 : 0 }} className="absolute block rounded-full bg-zinc p-1 text-4xl dark:bg-zinc-800">{sunIcon}</motion.span>
                    </button>
                    {children}
                </div>
            </div>
        </main>
    );
};

export default Toggle;
