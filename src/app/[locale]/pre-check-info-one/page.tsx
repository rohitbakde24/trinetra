'use client'

import Image from "next/image";
import React from "react";
import car from "/public/images/car.avif";
import cone from "/public/images/cone.avif";
import rightEllipse from "/public/images/right-ellipse.avif";
import leftEllipse from "/public/images/left-ellipse.avif";
import person from "/public/images/person.avif";
import { usePathname, useRouter } from "next/navigation";

const PreCheckInfoOne = () => {
     const router = useRouter();
          const pathname = usePathname();
          const currentLang = pathname.split("/")[1] || "en";
    const tabToBeginClick = () =>{
        router.push(`/${currentLang}/info-step-gallery/0`);
    }
  return (
    <div className="h-screen flex items-center justify-center bg-black">
    <div className="relative flex items-center gap-5">
      {/* Car and elements */}
      <div className="relative w-[330px] h-[230px]">
        <Image src={car} alt="car" width={270} className="absolute z-10 mx-auto inset-x-0" />
        <Image
          src={cone}
          width={34}
          alt="cone"
          className="absolute top-[70px] left-[20px]"
        />
        <Image
          src={cone}
          alt="cone"
          width={34}
          className="absolute top-[70px] right-[42px]"
        />
        <Image
          src={cone}
          alt="cone"
          width={34}
          className="absolute top-[172px] left-[30px]"
          />
        <Image
          src={leftEllipse}
          alt="leftEllipse"
          className="absolute z-0 top-[76px] right-[68px]"
        />
        <Image
          src={rightEllipse}
          alt="rightEllipse"
          className="absolute z-0 top-[47px] right-[14px]"
        />
        <Image
          src={person}
          width={63}
          alt="person"
          className="absolute z-20 top-[118px] left-[47px]"
        />
      </div>

      {/* Instruction Box */}
      <div className="w-[250px] bg-zinc-800 p-5 rounded-4xl text-white">
        <p className="text-md leading-relaxed">
          Remove visible dust, snow, or ice from the car. Stand about 2.5
          meters from the car in a well-lit, safe area.
        </p>
        <button onClick={tabToBeginClick} className="text-white bg-green-600 py-2 px-8 mt-3 text-sm rounded-full flex items-center gap-2">
          Tap to begin
          <span >→</span>
        </button>
      </div>
    </div>
  </div>
  );
};

export default PreCheckInfoOne;
