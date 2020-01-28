import React, { useEffect } from "react";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

function Cart({ content, cart, removeFromCart }) {
  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  let itemToShow = {};

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    if (itemToShow[item]) {
      itemToShow[item] = itemToShow[item] + 1;
    } else {
      itemToShow[item] = 1;
    }
  }

  return (
    <section className="cart">
      <div className="grid_container">
        <div className="grid_row">
          <div className="grid_desktop_12 page_title">
            <h1>Shopping Cart</h1>
          </div>
          <div className="grid_desktop_7">
            {Object.keys(itemToShow).map(item => {
              return (
                <div className="cart_item" key={item}>
                  <div className="cart_item_image">
                    <img
                      src={content[item]["image"]}
                      alt={content[item]["name"]}
                    />
                  </div>
                  <div className="cart_item_info">
                    <h3 className="cart_item_title">
                      Name: {content[item]["name"]}
                    </h3>
                    <p className="cart_item_color">
                      Color: {content[item]["color"]}
                    </p>
                    <p className="cart_item_capacity">
                      Capacity: {content[item]["capacity"]}
                    </p>
                    <p className="cart_item_price">
                      Price: {content[item]["price"]}$ x {itemToShow[item]}
                    </p>
                  </div>
                  <div
                    className="cart_remove"
                    onClick={() => {
                      removeFromCart(+item);
                    }}
                  >
                    <DeleteIcon fontSize="large" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid_desktop_5"></div>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    content: state.content,
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  let { removeFromCart } = bindActionCreators(actions, dispatch);

  return {
    removeFromCart: id => {
      removeFromCart(id);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
