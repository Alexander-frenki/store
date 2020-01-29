export let addToCart = variantId => ({
  type: "ADD_TO_CART",
  variantId: variantId,
});
export let removeFromCart = id => ({
  type: "REMOVE_ITEM",
  id: id,
});
export let addItemCount = id => ({
  type: "ADD_ITEM_COUNT",
  id: id,
});
export let removeItemCount = id => ({
  type: "REMOVE_ITEM_COUNT",
  id: id,
});
export let updateFormData = (name, value) => ({
  type: "UPDATE_FORM_DATA",
  name: name,
  value: value,
});
export let resetCart = () => ({
  type: "RESET_CART",
});
