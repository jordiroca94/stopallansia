import Layer0 from "../../public/images/layer0.png";
import Layer1 from "../../public/images/layer1.png";
import Layer2 from "../../public/images/layer2.png";
import Layer3 from "../../public/images/layer3.png";
import Layer4 from "../../public/images/layer4.png";
import Layer5 from "../../public/images/layer5.png";
import Layer6 from "../../public/images/layer6.png";
import Layer7 from "../../public/images/rocket.png";
import Countdown from "./Countdown";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import KeyboardAnimation from "./animations/KeyboardAnimation";
import SimpleAnimation from "./animations/SimpleAnimation";
import TextAnimation from "./animations/TextAnimation";

const Parallax = () => {
  return (
    <div className="parallax inset-0 absolute overflow-x-hidden overflow-y-auto h-screen ">
      <Header parallax />
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
        <img className="size-96" src={Layer7.src} />
      </div>
      <div className="parallax__layer parallax__layer__7 flex justify-center items-center text-center">
        <TextAnimation>
          <div className="flex flex-col mb-[35%] sm:mb-[15%] text-black">
            <h1 className="text-xl md:text-6xl font-bold font-secondary">
              STOP ALL ANSIA
            </h1>
            <h2 className="text-sm md:text-2xl font-bold py-2">
              01.07 - 03.07.2025
            </h2>
            <h3 className="text-sm md:text-2xl font-bold uppercase">
              Mallorca
            </h3>
          </div>
        </TextAnimation>
      </div>
      <div className="parallax__cover">
        <div className="text-white flex justify-center items-center w-full flex-col h-screen gap-8">
          <SimpleAnimation>
            <h3 className="text-3xl font-bold uppercase">Welcome back </h3>
          </SimpleAnimation>
          <SimpleAnimation>
            <Countdown />
          </SimpleAnimation>
          <SimpleAnimation>
            <h5 className="text-lg font-bold uppercase text-gray-300">
              Private event
            </h5>
          </SimpleAnimation>
          <div className="max-w-[350px] lg:max-w-[700px] text-lg flex flex-col gap-3 font-semibold w-full text-justify">
            <KeyboardAnimation
              className="text-sm md:text-2xl font-bold"
              text={[
                "An experience that invites one to experience, grow and live in the present with an open heart and mind.",
                "Here, art breaks free from boundaries, fostering a sincere and sustainable dialogue between different forms of expression",
                "Stop all Ansia Festival is a creative retreat that unites nature, people and art in a journey away from everyday anxiety.",
              ]}
              once
            />
          </div>
          <SimpleAnimation className="mr-4">
            <Link
              href="/reserve"
              className="font-extrabold text-lg uppercase border-white border-2 py-2 px-6 rounded-lg hover:bg-white hover:text-black"
            >
              Reserve your spot
            </Link>
          </SimpleAnimation>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Parallax;
