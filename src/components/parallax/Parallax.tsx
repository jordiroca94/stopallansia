import ParallaxLayers from "./ParallaxLayers";
import ParallaxCover from "./ParallaxCover";
import Header from "../header/Header";

const Parallax = () => {
  return (
    <div className="parallax inset-0 absolute overflow-x-hidden overflow-y-auto h-screen">
      <Header parallax />
      <ParallaxLayers />
      <ParallaxCover />
    </div>
  );
};

export default Parallax;
