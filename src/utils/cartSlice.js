import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (cartItem) => cartItem?.item?.card?.info?.id === action.payload.card.info.id
      );

      if (existingItem) {
        // If the item exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If the item does not exist, add it to the cart
        state.items.push({
          item: action.payload,
          quantity: 1,
        });
      }

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (cartItem) => cartItem?.item?.card?.info?.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    increaseItemQuantity: (state, action) => {
      const { id } = action.payload;

      const itemToIncrease = state.items.find(
        (cartItem) => cartItem?.item?.card?.info?.id === id
      );

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseItemQuantity: (state, action) => {
      const { id } = action.payload;
      const itemToDecrease = state.items.find(
        (cartItem) => cartItem?.item?.card?.info?.id === id
      );

      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

// Selectors
export const selectItemsInCart = ({ cart }) => cart?.items;

export const selectTotalPrice = ({ cart }) => {
  return cart?.items.reduce((total, cartItem) => {
    return total + (cartItem.item.itemPrice * cartItem.quantity) / 100; // Assuming itemPrice is in paise
  }, 0);
};

// Export actions
export const {
  addToCart,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;