import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { useHistory } from "react-router-dom";

function FinishModal({
  isFinish,
  setIsFinish,
  formData,
  itemToShow,
  content,
  totalPrice,
  resetCart,
}) {
  let history = useHistory();

  function redirectToHome() {
    history.push("/");
  }

  return (
    isFinish && (
      <div className="modal active finish">
        <div className="modal_overlay"></div>
        <div className="modal_body">
          <div className="finish_personal">
            <h4>Personal information:</h4>
            {Object.keys(formData).map(item => {
              return <p key={item}>{formData[item]}</p>;
            })}
          </div>
          <div className="finish_order">
            <h4>Order:</h4>
            {Object.keys(itemToShow).map(item => {
              return (
                <div className="finish_order_item" key={item}>
                  <img
                    src={content[item]["image"]}
                    alt={content[item]["name"]}
                  />
                  <p>{content[item]["name"]}</p>
                  <p>{content[item]["color"]}</p>
                  <p>{content[item]["capacity"]}</p>
                  <p>
                    {content[item]["price"]}$ x {itemToShow[item]}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="finish_total">
            <span>Total price:</span>
            <span>{totalPrice}$</span>
          </div>
          <button
            className="btn"
            onClick={() => {
              resetCart();
              setIsFinish(false);
              redirectToHome();
            }}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    )
  );
}

function mapStateToProps(state) {
  return {
    formData: state.formData,
    content: state.content,
  };
}

function mapDispatchToProps(dispatch) {
  let { resetCart } = bindActionCreators(actions, dispatch);

  return {
    resetCart,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishModal);
