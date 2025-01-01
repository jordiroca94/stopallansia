import { useTranslations } from "next-intl";
import TextAnimation from "../animations/TextAnimation";
import BackgroundLayer from "../../../public/images/backgroundLayer.png";
import RocketLayer from "../../../public/images/rocket.png";

import React from "react";

const ParallaxLayers = () => {
  const t = useTranslations();

  return (
    <>
      <div className="parallax__layer parallax__layer__background">
        <img src={BackgroundLayer.src} />
      </div>
      <div className="parallax__layer parallax__layer__rocket sm:hidden">
        <div className="flex justify-center">
          <img className="size-64 -mb-[10%] " src={RocketLayer.src} />
        </div>
      </div>
      <div className="parallax__layer parallax__layer__text flex justify-center items-center text-center">
        <TextAnimation>
          <div className="flex flex-col mb-[35%] sm:mb-[15%] text-black">
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
    </>
  );
};

export default ParallaxLayers;
