'use client';
import { useEffect, useState } from "react";
import { navbarData, copyRightIcon } from "@/assets";

const Navbar =()=>{
  const [activeId, setActiveId] = useState('');

  useEffect(()=>{
    const handleScroll = () => {
      const sections = navbarData.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;

          if (scrollPosition >= sectionTop - sectionHeight / 2 && scrollPosition < sectionTop + sectionHeight / 2) {
            setActiveId(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-[70px] h-full fixed left-0 top-0 flex flex-col justify-between border-r border-gray-200 px-4 py-10 xl:py-6 z-10">
      <a href="/home">
        <span className="text-3xl font-semibold text-red-400">M</span>
        <span className=" dark:text-white">.</span> 
        <span className="block w-min rotate-90 origin-bottom text-[12px] font-semibold dark:text-white">Yoshith</span>
      </a>
      <div className="flex flex-col gap-y-3 sm:gap-y-2 xl:gap-y-1 xs:gap-y-0">
        {navbarData.map((item) => (
          <a href={`#${item.id}`} key={item.id} className="group flex flex-col items-center gap-y-2">
            <span className={`text-2xl group-hover:scale-125 xl:group-hover-115 xs:group-hover:scale-115 transition-all ${item.id === activeId ? "text-red-500 scale-110 xl:scale-100 xs:scale-80" : "text-yellow-600 scale-100 xl:scale-90 xs:scale-70"}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] tracking-wide -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300 text-center dark:text-white ${item.id === activeId ? "-translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`}>
              {item.name}
            </span>
          </a>
        ))}
      </div>
      <p className="flex items-center justify-center text-[13px] xs:text-[11px]  text-gray-500 mt-6">
        <span className="absolute left-1/2 w-max flex items-center -rotate-90 origin-bottom-left tracking-wider dark:text-gray-200 transition-colors ">{copyRightIcon} 2015 - {new Date().getFullYear()}</span>
      </p>
    </div>
  );
};

export default Navbar;
