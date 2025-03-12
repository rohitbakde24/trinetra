"use client";

import Image from "next/image";
import camcom from "/public/images/camcom.png";
import arrow from "/public/images/icons/arrow-right.png";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";


export default function Home() {
  const t = useTranslations("HomePage");
 
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1] || "en";
  
  return (
    <>
      <div className=" z-10 bg-[url('/images/cover_bg.avif')] px-6 flex items-center text-white font-bold  bg-cover bg-center h-screen w-full">
        
        <div className="flex portrait:flex-wrap gap-4 items-center">
          <h1
            className="font-normal text-2xl"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          ></h1>
          <button
            type="button"
            className="text-gray-900 mt-2 cursor-pointer bg-white border border-gray-300  font-bold rounded-2xl text-[20px] px-4 py-2 me-2 mb-2 flex items-center gap-1.5"
            onClick={()=> router.push(`${currentLang}/permission`)}
         >
            {t("btnText")}
            <span>
              <Image src={arrow} alt="arrow" width={18} />
            </span>
          </button>
        </div>
        <div className="absolute bg-black px-1.5 pt-1.5 pb-1 rounded-lg bottom-[20px] flex justify-between gap-1 text-[8px] font-bold items-center">
          <Image src={camcom} alt="camcom" width={15} />{" "}
          {t("footer")?.toUpperCase()}
        </div>
      </div>
    </>
  );
}
