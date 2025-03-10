'use client'

import Image from "next/image";
import camcom from "/public/images/camcom.png";
import arrow from "/public/images/icons/arrow-right.png";
import langIcon from "/public/images/icons/lang.png";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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


export default function Home() {
  const t = useTranslations('HomePage');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1] || "en";
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
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

  const handleLangChange = (lang: string, label:string) => {
      router.push(`/${lang}`);
      setIsOpen(false);
    
  };
  return (
    <>
      <div className="relative bg-[url('/images/cover_bg.avif')] px-6 flex items-center text-white font-bold  bg-cover bg-center h-screen w-full">
        <div className="absolute top-[30px] flex justify-between">
          <Image src={camcom} alt="camcom" width={32} />
        </div>
        <div className="absolute top-[30px] end-[20px] flex justify-between">
        <div className="fixed top-4 right-4">
      <button
        className={`text-white border border-white font-medium rounded-full text-xs px-3 py-1 flex items-center gap-1 transition-transform duration-300`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {languages?.find((lang) => lang.code === currentLang)?.label || "ENG"}
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
              onClick={() => handleLangChange(code, label)}
              className={`w-full font-medium text-sm text-white border border-gray-500 rounded-full px-4 py-2 transition-all`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
       </div>
        <div className="flex portrait:flex-wrap gap-4 items-center">
          <h1 className="font-normal text-2xl" dangerouslySetInnerHTML={{ __html: t("title") }}>
         
          </h1>
          <button
            type="button"
            className="text-gray-900 cursor-pointer bg-white border border-gray-300  font-bold rounded-2xl text-[20px] px-4 py-2 me-2 mb-2 flex items-center gap-1.5"
          >
            {t("btnText")}
            <span>
              <Image src={arrow} alt="arrow" width={18} />
            </span>
          </button>
        </div>
        <div className="absolute bg-black px-1.5 pt-1.5 pb-1 rounded-lg bottom-[20px] flex justify-between gap-1 text-[8px] font-bold items-center">
        <Image src={camcom} alt="camcom" width={15}/> {t('footer')?.toUpperCase()}
      </div>
      </div>
    </>
  );
}
