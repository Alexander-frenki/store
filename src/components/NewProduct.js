import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function getFirstProperty(obj) {
  for (let key in obj) {
    return obj[key];
  }
}

function NewProduct({ items, content }) {
  return (
    <div className="grid_container new_product">
      <div className="grid_row">
        <div className="grid_desktop_12">
          <h2>New Product</h2>
        </div>
      </div>
      <div className="grid_row">
        <div className="grid_desktop_10">
          {items.map(item => {
            return <ProductItem item={item} key={item} content={content} />;
          })}
        </div>
      </div>
    </div>
  );
}

function ProductItem({ content, item }) {
  let firstProduct = getFirstProperty(content[item].products);
  let firstVariant = getFirstProperty(firstProduct.variants);
  return (
    <div className="item grid_row">
      <div className="item_image grid_desktop_6">
        <img src={firstVariant.image} alt={firstVariant.name} />
      </div>
      <div className="item_info grid_desktop_6">
        <h3>{firstVariant.name}</h3>
        <p>From: {firstVariant.price}$</p>
        <Link
          to={`/products/${item}/${firstProduct.handle}?variant=${firstVariant.id}`}
        >
          <button className="btn">BUY</button>
        </Link>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    content: state.content,
  };
}

export default connect(mapStateToProps)(NewProduct);
