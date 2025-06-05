import React from "react";
import SecondCounter from "./SecondCounter";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  return (
    <div className="text-center">
      <div className="m-5">
        <SecondCounter />
      </div>
    </div>
  );
};

export default Home;
