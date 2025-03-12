'use client'
import Image from "next/image";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Permission = () => {
    const [locationGranted, setLocationGranted] = useState<boolean>(false);
    const [cameraGranted, setCameraGranted] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1); // 1 = Location, 2 = Camera
    const router = useRouter();
      const pathname = usePathname();
      const currentLang = pathname.split("/")[1] || "en";
  
    const requestLocationPermission = (): void => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationGranted(true);
          setStep(2); // Move to the next step
        },
        (error: GeolocationPositionError) => {
          alert(`Location Permission Denied: ${error.message}`);
        }
      );
    };
  
    const requestCameraPermission = async (): Promise<void> => {
        try {
          const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
          setCameraGranted(true);
          stream.getTracks().forEach((track) => track.stop()); // Stop camera stream after checking
          setStep(3); // Move to "Continue" step
          enterFullScreen(); // Go fullscreen
        } catch (error) {
          if (error instanceof Error) {
            alert(`Camera Permission Denied: ${error.message}`);
          } else {
            alert("An unknown error occurred while requesting camera access.");
          }
        }
      };
    
      const enterFullScreen = (): void => {
        const elem = document.documentElement; // Fullscreen for the entire page
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if ((elem as any).mozRequestFullScreen) {
          (elem as any).mozRequestFullScreen(); // Firefox
        } else if ((elem as any).webkitRequestFullscreen) {
          (elem as any).webkitRequestFullscreen(); // Chrome, Safari, Opera
        } else if ((elem as any).msRequestFullscreen) {
          (elem as any).msRequestFullscreen(); // IE/Edge
        }
      };
    
  
    const handleButtonClick = (): void => {
      if (step === 1) {
        requestLocationPermission();
      } else if (step === 2 && locationGranted) {
        requestCameraPermission();
    } else if (step === 3 && locationGranted && cameraGranted) {
        router.push(`/${currentLang}/pre-check-info-one`); // Preserve locale and navigate
      }
    };
  return (
    <>
        
      <div className="pt-20 text-center">
        <h3 >
          We need some permissions to make this happen
        </h3>
        <div className="flex gap-3  justify-center mt-5 ">
          <div className="bg-neutral-700 p-8 text-center rounded-2xl">
            <span className="block">Location</span>
            {locationGranted ? <p className="text-green-400 mt-3">Granted</p> : '-'}
          </div>
          <div className="bg-neutral-700 p-8 text-center rounded-2xl">
            <span className="block">Camera</span>
      {cameraGranted ? <p className="text-green-400 mt-3">Granted</p> : '-'}
          </div>
        </div>
      </div>
        <div className="flex justify-center pt-3">
      <button
        type="button"
        className={`${step === 3 ? "bg-green-700 text-white" : "bg-white text-black"}   mt-2 cursor-pointer   font-bold rounded-2xl text-[20px] px-4 py-2 me-2 mb-2 flex items-center gap-1.5`}
        onClick={handleButtonClick}>
        {step === 1 ? "Grant Location Permission" : step === 2 ? "Grant Camera Permission" : "Continue"} 
        <span className="ml-1">→</span>
      </button>
      </div>
    </>
  );
};

export default Permission;
