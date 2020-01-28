import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

let root = document.documentElement;

let sliderRun = new Event("onSliderRun");
let sliderStop = new Event("onSliderStop");

document.addEventListener("onSliderRun", function() {
  console.log("sliderRunning");
});
document.addEventListener("onSliderStop", function() {
  console.log("sliderStoped");
});

let defaultSettings = {
  animationSpeed: 1000,
  height: 250,
  dots: false,
  nav: false,
  animationBehavior: "linear",
  slideToShow: 1,
  marginRight: 0,
};

function Carousel({ data, settings }) {
  let setup = { ...defaultSettings, ...settings };

  let [activeSlide, setActiveSlide] = useState(0);
  let [currentOffset, setCurrentOffset] = useState(0);
  let [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    setSlideWidth(
      (root.querySelector(".slider").offsetWidth -
        setup.marginRight * (setup.slideToShow - 1)) /
        setup.slideToShow,
    );
    root.style.setProperty("--marginRight", setup.marginRight + "px");
    root.style.setProperty("--itemWidth", slideWidth + "px");
    root.style.setProperty("--sliderHeight", setup.height + "px");
    root.style.setProperty("--animationSpeed", setup.animationSpeed + "ms");
    root.style.setProperty("--animationBehavior", setup.animationBehavior);
  }, [setup, slideWidth]);

  useEffect(() => {
    root.style.setProperty("--offset", currentOffset + "px");
    return () => {
      document.dispatchEvent(sliderRun);
      setTimeout(() => {
        document.dispatchEvent(sliderStop);
      }, setup.animationSpeed);
    };
  }, [currentOffset, setup.animationSpeed]);

  useEffect(() => {
    let newOffset;
    if (activeSlide === 0) {
      newOffset = 0;
    } else if (activeSlide > 0) {
      newOffset = -(activeSlide * slideWidth + activeSlide * setup.marginRight);
    }
    setCurrentOffset(newOffset);
  }, [activeSlide, slideWidth, setup.marginRight]);

  function goToSlide(index) {
    setActiveSlide(index);
  }

  function nextSlide() {
    setActiveSlide(activeSlide => activeSlide + 1);
  }

  function prevSlide() {
    setActiveSlide(activeSlide => activeSlide - 1);
  }

  return (
    data && (
      <div className="slider">
        <div className="slider_body">
          <div className="slider_content">
            {data.map((item, index) => {
              return <SlideItem key={index} item={item} />;
            })}
          </div>
        </div>
        {setup.nav && data.length > setup.slideToShow && (
          <NavBtn
            nextSlide={nextSlide}
            prevSlide={prevSlide}
            quantitySlide={data.length}
            activeSlide={activeSlide}
            slideToShow={setup.slideToShow}
          />
        )}
        {setup.dots && (
          <Dots
            quantitySlide={data.length}
            goToSlide={goToSlide}
            activeSlide={activeSlide}
            slideToShow={setup.slideToShow}
          />
        )}
      </div>
    )
  );
}

function SlideItem({ item }) {
  return (
    <div className="slider_item">
      <Link to={`collections/${item.handle}`}>
        <img src={item.image} alt={item.name} />
      </Link>
    </div>
  );
}

function Dots({ quantitySlide, goToSlide, activeSlide, slideToShow }) {
  let size = Array(quantitySlide - slideToShow + 1).fill(null);
  let [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    setActiveDot(activeSlide);
  }, [activeSlide]);

  return (
    <ul className="slider_dots">
      {size.map((item, index) => {
        return (
          <li
            key={index}
            className={`slider_dots_item ${
              index === activeDot ? "active" : ""
            }`}
            onClick={() => {
              setActiveDot(index);
              goToSlide(index);
            }}
          ></li>
        );
      })}
    </ul>
  );
}

function NavBtn({
  nextSlide,
  prevSlide,
  quantitySlide,
  activeSlide,
  slideToShow,
}) {
  return (
    <div className="slider_btns">
      <button disabled={activeSlide === 0} onClick={prevSlide}>
        <NavigateBeforeIcon fontSize="large" />
      </button>
      <button
        disabled={activeSlide >= quantitySlide - slideToShow}
        onClick={nextSlide}
      >
        <NavigateNextIcon fontSize="large" />
      </button>
    </div>
  );
}

export default Carousel;
