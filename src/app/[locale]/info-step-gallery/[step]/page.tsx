"use client";

import { useRouter, usePathname } from "next/navigation";

const steps = [1, 2, 3, 4, 5];

export default function StepProgressBar() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1] || "en";
  const pathnamearr = pathname.split("/")
  // Extracting step index from URL
  const currentStep = parseInt(pathnamearr[pathnamearr.length - 1] || "0");

  const handleStepClick = (step: number) => {
    router.push(`/${currentLang}/info-step-gallery/${step}`);
  };

  return (
    <div className="flex mt-2 pt-8 items-center justify-center gap-2 py-5  text-white">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          {/* Step Circle */}
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full  ${
              step <= currentStep ? "bg-green-500 text-black" : ""
            } cursor-pointer`}
            onClick={() => handleStepClick(step - 1)}
          >
            {step <= currentStep ? "✔" : step}
          </div>

          {/* Line Connector (except last step) */}
          {index !== steps.length - 1 && (
            <div
              className={`w-12 h-[2px] ms-1 ${
                step <= currentStep ? "bg-blue-500" : "bg-gray-400"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
