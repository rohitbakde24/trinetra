'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

import langIcon from "/public/images/icons/lang.png";
import camcom from "/public/images/camcom.png";
import { usePathname, useRouter } from 'next/navigation';


const languages = [
  { code: "en", label: "ENG" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "عربي" },
  { code: "lv", label: "Latviešu" },
  { code: "lt", label: "Lietuvių" },
  { code: "ru", label: "Русский" },
  { code: "et", label: "Eesti" },
  { code: "id", label: "Bahasa" },
  { code: "hi", label: "हिन्दी" },
  { code: "es", label: "Español" },
  { code: "th", label: "ไทย" },
];

const Header = () => {
     const [isOpen, setIsOpen] = useState(false);
     const router = useRouter();
     const sidebarRef = useRef<HTMLDivElement | null>(null);
     const pathname = usePathname();
     const currentLang = pathname.split("/")[1] || "en";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLangChange = (lang: string) => {
    router.replace(`/${lang}`);
    setIsOpen(false);
  };
  useEffect(() => {
    languages.forEach(({ code }) => {
      router.prefetch(`/${code}`);
    });
  }, []);
  return (
    <div className='z-50'>
        <div className="absolute start-[20px] top-[30px] flex justify-between">
          <Image src={camcom} alt="camcom" width={32} />
        </div>
        <div className="absolute top-[30px] end-[20px] flex justify-between">
         
            <button
              className={`text-white border cursor-pointer border-white font-medium rounded-full text-xs px-3 py-1 flex items-center gap-1 transition-transform duration-300`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {languages?.find((lang) => lang.code === currentLang)?.label ||
                "ENG"}
              <Image src={langIcon} alt="lang" width={16} height={16} />
            </button>
            {/* overlay bg */}
            {isOpen && (
              <div
                className="fixed top-0 right-0 h-full w-screen bg-[#0000009d] bg-opacity-50 transition-opacity  z-40"
                onClick={() => setIsOpen(false)}
              ></div>
            )}
            <div
              ref={sidebarRef}
              className={`fixed top-0 z-50 right-0 h-full w-35 bg-black p-5 shadow-lg transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
              } overflow-y-auto max-h-screen`}
            >
              <div className="flex  flex-col gap-2">
                {languages.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => handleLangChange(code)}
                    className={`w-full cursor-pointer font-medium text-sm text-white border border-gray-500 rounded-full px-4 py-2 transition-all`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          
        </div>
    </div>
  )
}

export default Header