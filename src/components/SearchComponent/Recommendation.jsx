import React from "react";
import CircleView from "./CircleView";

function Recommendation() {
  const cusines = [
    {
      text: "Indian",
      image: "https://miro.medium.com/max/2400/1*UegPuEE-nV5Nv_M734AVng.jpeg",
    },
    {
      text: "German",
      image:
        "https://www.thespruceeats.com/thmb/a2081g-3p7gDU-7vjdhm2-FGjV0=/1896x1422/smart/filters:no_upscale()/GettyImages-697310048-594c507f5f9b58f0fcb236f0.jpg",
    },
    {
      text: "Italian",
      image:
        "https://www.takeaway.com/foodwiki/uploads/sites/11/2019/06/italian-cuisine-47-1440x600.jpg",
    },
    {
      text: "Chinese",
      image:
        "https://www.englishclub.com/images/vocabulary/food/chinese/chinese-food.jpg",
    },
  ];

  return (
    <div className="circle__position">
      {cusines.map((el) => {
        return (
          <div className="circle__alignment" key={el.text}>
            <CircleView image={el.image} text={el.text} id={el.text} />{" "}
          </div>
        );
      })}
    </div>
  );
}

export default Recommendation;
