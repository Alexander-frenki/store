import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Product({ content, addToCart }) {
  let query = useQuery();
  let history = useHistory();
  let { productGroup, productHandle } = useParams();
  let variantID = query.get("variant");

  let product = content[productGroup].products[productHandle];

  let [currentVariant, setCurrentVariant] = useState(
    product.variants[variantID],
  );

  let [checkedVariant, setCheckedVariant] = useState({
    color: currentVariant.color,
    capacity: currentVariant.capacity,
  });

  let [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    history.push(`${window.location.pathname}?variant=${currentVariant.id}`);
  }, [currentVariant, history, productGroup, productHandle]);

  useEffect(() => {
    for (let key in product.variants) {
      let color = product.variants[key].color;
      let capacity = product.variants[key].capacity;
      if (
        color === checkedVariant.color &&
        capacity === checkedVariant.capacity
      ) {
        setCurrentVariant(product.variants[key]);
      }
    }
  }, [checkedVariant, product.variants]);

  function handleSubmit(e) {
    e.preventDefault();
    addToCart(currentVariant.id);
    setIsAnimate(true);
  }

  return (
    <section className="product">
      <div className="grid_container">
        <div className="grid_row">
          <div className="grid_desktop_12">
            <h1 className="page_title">{product.name}</h1>
          </div>
        </div>
        <div className="grid_row line">
          <div className="grid_desktop_6 product_images">
            <img src={currentVariant.image} alt={currentVariant.name} />
            <AnimateImage
              image={currentVariant.image}
              alt={currentVariant.name}
              isAnimate={isAnimate}
              setIsAnimate={setIsAnimate}
            />
          </div>
          <div className="grid_desktop_6 product_info">
            <form onSubmit={handleSubmit}>
              <h3>Information</h3>
              <div className="product_colors product_single_colors">
                {product.colors.map(color => (
                  <label key={color}>
                    <input
                      defaultChecked={color === currentVariant.color}
                      type="radio"
                      name="color"
                      value={color}
                      onChange={e =>
                        setCheckedVariant({
                          ...checkedVariant,
                          color: e.target.value,
                        })
                      }
                    />
                    <span
                      className={color.toLowerCase().replace(" ", "_")}
                    ></span>
                  </label>
                ))}
              </div>
              <div className="product_capacity product_single_capacity">
                {product.capacity.map((capacity, index) => (
                  <label key={capacity}>
                    <input
                      defaultChecked={capacity === currentVariant.capacity}
                      type="radio"
                      name="capacity"
                      value={capacity}
                      onChange={e =>
                        setCheckedVariant({
                          ...checkedVariant,
                          capacity: e.target.value,
                        })
                      }
                    />
                    <span key={capacity}>{capacity}</span>
                  </label>
                ))}
              </div>
              <button disabled={isAnimate} type="submit" className="btn">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
        <div className=" product_description">
          <div className="grid_row">
            <div className="grid_desktop_12">
              <h3>Description</h3>
            </div>
          </div>
          <div className="grid_row">
            {Object.keys(product.description).map(item => {
              return (
                <div
                  className="product_description_item grid_desktop_6"
                  key={item}
                >
                  <h5>{item}</h5>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: product.description[item],
                    }}
                  ></p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

let initialStateImage = {
  width: "100%",
  transform: "translate3d(0,0,0)",
  opacity: 1,
};

function AnimateImage({ image, alt, isAnimate, setIsAnimate }) {
  let animImage = useRef(null);
  let [imageStyle, setImageStyle] = useState(initialStateImage);

  let animateImage = useCallback(() => {
    setImageStyle(imageStyle => ({
      ...imageStyle,
      width: "50px",
      transition: "all 0.5s",
    }));
    setTimeout(() => {
      let cartRect = document.querySelector(".cart").getBoundingClientRect();
      let imgRect = animImage.current.getBoundingClientRect();
      let topOffset =
        cartRect.top < 0
          ? -cartRect.top + imgRect.top
          : cartRect.top + imgRect.top;
      setImageStyle(imageStyle => ({
        ...imageStyle,
        transform: `translate3d(${cartRect.left - 100}px, ${-topOffset}px, 0)`,
      }));
      setTimeout(() => {
        setImageStyle(imageStyle => ({
          ...imageStyle,
          width: "0px",
          opacity: 0,
        }));
        setTimeout(() => {
          setImageStyle(() => ({
            ...initialStateImage,
            transition: "all 0s",
          }));
          setIsAnimate(false);
        }, 200);
      }, 500);
    }, 500);
  }, [setIsAnimate]);

  useEffect(() => {
    if (isAnimate) {
      animateImage();
    }
  }, [isAnimate, animateImage]);

  return (
    <img
      style={{ ...imageStyle }}
      className="product_images_animate"
      src={image}
      alt={alt}
      ref={animImage}
    />
  );
}

function mapStateToProps(state) {
  return {
    content: state.content,
  };
}

function mapDispatchToProps(dispatch) {
  let { addToCart } = bindActionCreators(actions, dispatch);

  return {
    addToCart: variantId => {
      addToCart(variantId);
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);
