import Header from "../Header";
import ParallaxLayers from "./ParallaxLayers";
import ParallaxCover from "./ParallaxCover";

const Parallax = () => {
  return (
    <div className="bg-white parallax inset-0 absolute overflow-x-hidden overflow-y-auto h-screen">
      <Header parallax />
      <ParallaxLayers />
      <ParallaxCover />
    </div>
  );
};

export default Parallax;
