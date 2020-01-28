import React, { useState, useEffect } from "react";
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
  }

  return (
    <section className="product">
      <div className="grid_container">
        <div className="grid_row">
          <div className="grid_desktop_12">
            <h1 className="page_title">{product.name}</h1>
          </div>
        </div>
        <div className="grid_row">
          <div className="grid_desktop_6 product_images">
            <img src={currentVariant.image} alt={currentVariant.name} />
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
              <button type="submit">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    </section>
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
