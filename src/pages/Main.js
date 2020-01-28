import React from "react";
import { connect } from "react-redux";
import Carousel from "../components/Carousel";

let carouselSettings = {
  animationSpeed: 700,
  height: 500,
  dots: true,
  nav: true,
  animationBehavior: "ease",
  slideToShow: 1,
  marginRight: 30,
};

function Main({ collections }) {
  return (
    <section className="grid_full_container">
      <Carousel data={collections} settings={carouselSettings} />
    </section>
  );
}

function mapStateToProps(state) {
  return {
    collections: state.content.collections,
  };
}

export default connect(mapStateToProps)(Main);
