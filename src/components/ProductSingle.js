import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function getFirstProperty(obj) {
  for (let key in obj) {
    return obj[key];
  }
}

function ProductSingle({ product }) {
  let { collectionID } = useParams();

  let [checkedVariant, setCheckedVariant] = useState({
    color: product.colors[0],
    capacity: product.capacity[0],
  });
  let [currentVariant, setCurrentVariant] = useState(
    getFirstProperty(product.variants),
  );

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
        <Link
          to={`/products/${collectionID}/${product.handle}?variant=${currentVariant.id}`}
        >
          <button className="btn">BUY</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductSingle;
