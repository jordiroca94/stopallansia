import Layer0 from "../../public/images/layer0.png";
import Layer1 from "../../public/images/layer1.png";
import Layer2 from "../../public/images/layer2.png";
import Layer3 from "../../public/images/layer3.png";
import Layer4 from "../../public/images/layer4.png";
import Layer5 from "../../public/images/layer5.png";
import Layer6 from "../../public/images/layer6.png";
import Countdown from "./Countdown";
import { FaInstagram } from "react-icons/fa";
import Logo from "../icons/footerLogo";
const Parallax = () => {
  return (
    <div className="parallax inset-0 absolute overflow-x-hidden overflow-y-auto h-screen ">
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
      <div className="parallax__layer parallax__layer__7 flex justify-center items-center text-center">
        <div className="flex flex-col mb-[15%] text-black">
          <h1 className="text-xl lg:text-6xl font-bold font-secondary">
            STOP ALL ANSIA
          </h1>
          <h2 className="text-sm lg:text-2xl font-bold py-2">
            01.07 - 03.07.2025
          </h2>
          <h3 className="text-sm lg:text-2xl font-bold uppercase">Mallorca</h3>
        </div>
      </div>
      <div className="parallax__cover">
        <div className="text-white flex justify-center items-center w-full flex-col h-screen gap-8">
          <h3 className="text-3xl font-bold uppercase">Welcome back </h3>
          <Countdown />
          <h5 className="text-lg font-bold uppercase text-gray-300">
            Private event
          </h5>
          <div className="max-w-[350px] lg:max-w-[700px] text-lg flex flex-col gap-3 font-semibold w-full text-justify">
            <p>
              An experience that invites one to experience, grow and live in the
              present with an open heart and mind.
            </p>
            <p>
              Here, art breaks free from boundaries, fostering a sincere and
              sustainable dialogue between different forms of expression
            </p>
            <p>
              Stop all Ansia Festival is a creative retreat that unites nature,
              people and art in a journey away from everyday anxiety.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center p-10 border-t border-cream bg-black text-white">
          <div className="flex flex-col justify-center items-center gap-4">
            <a
              className="flex flex-col gap-2 items-center"
              href="https://www.instagram.com/stop.all.ansia/"
            >
              <h5 className="text-center font-bold text-base hover:underline">
                Stay updated on the latest info
              </h5>
              <FaInstagram className="size-6 lg:size-7 transition-transform duration-300 hover:scale-125" />
            </a>
            <div>{Logo}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parallax;
