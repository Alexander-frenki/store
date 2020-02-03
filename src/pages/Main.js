import React from "react";
import { connect } from "react-redux";
import Carousel from "../components/Carousel";
import NewProduct from "../components/NewProduct";

let carouselSettings = {
  animationSpeed: 700,
  height: 500,
  dots: true,
  nav: true,
  animationBehavior: "ease",
  slideToShow: 1,
  marginRight: 30,
};
let newProductToShow = ["iphone", "ipad", "macbook"];

function Main({ collections }) {
  return (
    <>
      <Carousel data={collections} settings={carouselSettings} />
      <NewProduct items={newProductToShow} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    collections: state.content.collections,
  };
}

export default connect(mapStateToProps)(Main);
