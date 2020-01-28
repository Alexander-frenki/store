export let addToCart = variantId => ({
  type: "ADD_TO_CART",
  variantId: variantId,
});
export let removeFromCart = id => ({
  type: "REMOVE_ITEM",
  id: id,
});
