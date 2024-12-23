import Layer0 from "../../public/images/layer0.png";
import Layer1 from "../../public/images/layer1.png";
import Layer2 from "../../public/images/layer2.png";
import Layer3 from "../../public/images/layer3.png";
import Layer4 from "../../public/images/layer4.png";
import Layer5 from "../../public/images/layer5.png";
import Layer6 from "../../public/images/layer6.png";
const Parallax = () => {
  return (
    <div className="parallax">
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
      <div className="parallax__cover"></div>
    </div>
  );
};

export default Parallax;
