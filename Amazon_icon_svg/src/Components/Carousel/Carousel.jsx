import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./images/data";
import "./Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselEffect() {
  return (
    <div className="hero_img">
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {img.map((image, index) => (
          <img key={index} src={image} alt="banner" />
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
