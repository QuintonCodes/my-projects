import React from "react";
import hero1 from "../../assets/mock-ups/Black-Hoodie-Front.webp";

function Slideshow() {
  return (
    <div className="slideshow-container">
      <div className="mySlides">
        <img src={hero1} alt="Front Black Hoodie" height="500" width="500" />
      </div>
    </div>
  );
}

export default Slideshow;
