import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import CartModal from "../components/CartModal";
import FinishModal from "../components/FinishModal";

function Cart({
  content,
  cart,
  removeFromCart,
  addItemCount,
  removeItemCount,
}) {
  let [totalPrice, setTotalPrice] = useState(null);
  let [isModalOpen, setIsOpenModal] = useState(false);
  let [isFinish, setIsFinish] = useState(false);

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

  useEffect(() => {
    let price = 0;
    for (let i = 0; i < cart.length; i++) {
      price += +content[cart[i]].price;
    }
    setTotalPrice(price);
  }, [cart, itemToShow, content]);

  return (
    <>
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
                      <div className="cart_item_counter">
                        <button
                          onClick={() => {
                            removeItemCount(item);
                          }}
                        >
                          <RemoveIcon fontSize="large" />
                        </button>
                        <p>{itemToShow[item]}</p>
                        <button
                          onClick={() => {
                            addItemCount(item);
                          }}
                        >
                          <AddIcon fontSize="large" />
                        </button>
                      </div>
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
            <div className="grid_desktop_5 ">
              <div className="cart_information">
                <p className="cart_information_title">Information:</p>
                <p className="cart_information_total">
                  <span>Total price:</span> <span>{totalPrice}$</span>
                </p>
                <p className="cart_information_total">
                  <span>Total quantity:</span>{" "}
                  <span>
                    {cart.length} {cart.length > 1 ? "items" : "item"}
                  </span>
                </p>
                <button
                  className="cart_buy btn"
                  onClick={() => setIsOpenModal(true)}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CartModal
        isModalOpen={isModalOpen}
        setIsOpenModal={setIsOpenModal}
        setIsFinish={setIsFinish}
      />
      <FinishModal
        isFinish={isFinish}
        setIsFinish={setIsFinish}
        itemToShow={itemToShow}
        totalPrice={totalPrice}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    content: state.content,
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  let { removeFromCart, addItemCount, removeItemCount } = bindActionCreators(
    actions,
    dispatch,
  );

  return {
    removeFromCart: id => {
      removeFromCart(id);
    },
    addItemCount: id => {
      addItemCount(id);
    },
    removeItemCount: id => {
      removeItemCount(id);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
