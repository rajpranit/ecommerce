import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity++;

      state.totalQuantity++;
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total = existingItem.total + existingItem.price;
      } else {
        state.items.push({
          key: newItem.id,
          id: newItem.id,
          total: newItem.price,
          title: newItem.name,
          description: newItem.desc,
          price: newItem.price,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity--;

      if (existingItem && existingItem?.quantity === 1) {
        state.items.splice(0, 1);
      }
      if (existingItem && existingItem.quantity > 1) {
        console.log("quantity more than 1");
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
