import { useTranslations } from "next-intl";
import TextAnimation from "../animations/TextAnimation";
import Layer0 from "../../../public/images/layer0.png";
import Layer1 from "../../../public/images/layer1.png";
import Layer2 from "../../../public/images/layer2.png";
import Layer3 from "../../../public/images/layer3.png";
import Layer4 from "../../../public/images/layer4.png";
import Layer5 from "../../../public/images/layer5.png";
import Layer6 from "../../../public/images/layer6.png";
import Layer7 from "../../../public/images/rocket.png";

import React from "react";

const ParallaxLayers = () => {
  const t = useTranslations();

  return (
    <>
      <div className="parallax__layer parallax__layer__0">
        <img src={Layer0.src} />
      </div>
      <div className="parallax__layer parallax__layer__1">
        <img src={Layer1.src} />
      </div>
      <div className="parallax__layer parallax__layer__2">
        <img src={Layer2.src} />
      </div>
      <div className="parallax__layer parallax__layer__3">
        <img src={Layer3.src} />
      </div>
      <div className="parallax__layer parallax__layer__4">
        <img src={Layer4.src} />
      </div>
      <div className="parallax__layer parallax__layer__5">
        <img src={Layer5.src} />
      </div>
      <div className="parallax__layer parallax__layer__6">
        <img src={Layer6.src} />
      </div>
      <div className="parallax__layer parallax__layer__8 sm:hidden">
        <div className="flex justify-center">
          <img className="size-64 -mb-[10%] " src={Layer7.src} />
        </div>
      </div>
      <div className="parallax__layer parallax__layer__7 flex justify-center items-center text-center">
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
