import React, { useState, useEffect } from "react";

function ProductSingle({ product }) {
  let [checkedVariant, setCheckedVariant] = useState({
    color: product.colors[0],
    capacity: product.capacity[0],
  });
  let [currentVariant, setCurrentVariant] = useState(product.variants[0]);

  useEffect(() => {
    for (let i = 0; i < product.variants.length; i++) {
      let el = product.variants[i];
      if (
        el.color === checkedVariant.color &&
        el.capacity === checkedVariant.capacity
      ) {
        setCurrentVariant(el);
      }
    }
  }, [checkedVariant, product.variants]);

  return (
    <div className="product_single">
      <div className="product_single_img">
        <img src={currentVariant.image} alt={product.name} />
      </div>
      <div className="product_single_name">
        <h2>{product.name}</h2>
      </div>
      <form>
        <div className="product_single_colors">
          {product.colors.map((color, index) => (
            <label key={color}>
              <input
                defaultChecked={index === 0}
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
              <span className={color.toLowerCase().replace(" ", "_")}></span>
            </label>
          ))}
        </div>
        <div className="product_single_capacity">
          {product.capacity.map((capacity, index) => (
            <label key={capacity}>
              <input
                defaultChecked={index === 0}
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
      </form>
      <div className="product_single_price">From: {currentVariant.price}$</div>
      <div className="product_single_link">
        <a href={currentVariant.id}>BUY</a>
      </div>
    </div>
  );
}

export default ProductSingle;
