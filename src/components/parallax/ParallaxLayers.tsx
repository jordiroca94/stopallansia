import { useTranslations } from "next-intl";
import TextAnimation from "../animations/TextAnimation";

import React from "react";
import CanvasBackground from "../canvas/CanvasBackground";

const ParallaxLayers = () => {
  const t = useTranslations();

  return (
    <div className="parallax__layer parallax__layer__text flex justify-center items-center text-center relative min-h-screen overflow-hidden bg-[#2d112b]">
      <CanvasBackground />
      <TextAnimation className="relative z-10">
        <div className="flex flex-col mb-[35%] sm:mb-[15%] text-white">
          <h1 className="text-xl md:text-6xl font-bold font-secondary">
            STOP ALL ANSIA
          </h1>
          <h2 className="text-sm md:text-2xl font-bold py-2">
            04.07 - 06.07.2025
          </h2>
          <h3 className="text-sm md:text-2xl font-bold uppercase">
            {t("MALLORCA")}
          </h3>
        </div>
      </TextAnimation>
    </div>
  );
};

export default ParallaxLayers;
