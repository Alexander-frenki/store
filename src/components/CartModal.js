import React, { useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

function CartModal({
  isModalOpen,
  setIsOpenModal,
  formData,
  updateFormData,
  setIsFinish,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    setIsFinish(true);
    setIsOpenModal(false);
    e.target.reset();
  }

  useEffect(() => {
    document.addEventListener("keydown", function(e) {
      if (e.keyCode === 27) {
        setIsOpenModal(false);
      }
    });
  }, [setIsOpenModal]);

  return (
    <div className={`cart_modal modal ${isModalOpen ? "active" : ""}`}>
      <div
        className="cart_modal_overlay modal_overlay"
        onClick={() => setIsOpenModal(false)}
      ></div>
      <div className="cart_modal_body modal_body">
        <h4>Customer Information</h4>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <p>Your Name</p>
            <input
              type="text"
              required
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={updateFormData}
            />
          </fieldset>
          <fieldset>
            <p>Your Last Name</p>
            <input
              type="text"
              required
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={updateFormData}
            />
          </fieldset>
          <fieldset>
            <p>Your Email</p>
            <input
              type="email"
              required
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={updateFormData}
            />
          </fieldset>
          <fieldset>
            <p>Choose country</p>
            <select
              name="country"
              value={formData.country}
              onChange={updateFormData}
            >
              <option>USA</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </fieldset>
          <fieldset>
            <p>Your message</p>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={updateFormData}
            ></textarea>
          </fieldset>
          <fieldset className="disclaimer">
            <label>
              <input type="checkbox" required />
              <span></span>
              <p>You confirm the use of your personal data</p>
            </label>
          </fieldset>
          <button type="submit" className="btn">
            CONFIRM
          </button>
        </form>
        <div
          className="cart_modal_close modal_close"
          onClick={() => setIsOpenModal(false)}
        >
          <CloseIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    formData: state.formData,
  };
}

function mapDispatchToProps(dispatch) {
  let { updateFormData } = bindActionCreators(actions, dispatch);

  return {
    updateFormData: e => {
      let name = e.target.name;
      let value = e.target.value;
      updateFormData(name, value);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
