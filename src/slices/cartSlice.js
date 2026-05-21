import { createSlice } from "@reduxjs/toolkit";

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      discount: 0,
      shippingAddress: {},
      paymentMethod: "",
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },

    applyDiscount: (state, action) => {
      state.discount = action.payload;
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

const updateCart = (state) => {
  if (state.cartItems.length === 0) {
    state.itemsPrice = 0;
    state.shippingPrice = 0;
    state.taxPrice = 0;
    state.totalPrice = 0;
    state.discountAmount = 0;
  } else {
    state.itemsPrice = addDecimals(
      state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
    const discountAmount = (state.itemsPrice * state.discount) / 100;
    state.discountAmount = addDecimals(discountAmount);

    const afterDiscount = state.itemsPrice - discountAmount;
    state.shippingPrice = addDecimals(afterDiscount > 2000 ? 0 : 200);
    state.taxPrice = addDecimals(Number(0.05 * afterDiscount).toFixed(2));

    state.totalPrice = (
      Number(afterDiscount) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2);
    localStorage.setItem("cart", JSON.stringify(state));
    return state;
  }
};

export const {
  addToCart,
  applyDiscount,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems
} = cartSlice.actions;
export default cartSlice.reducer;
