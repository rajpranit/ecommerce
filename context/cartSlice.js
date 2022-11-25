import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialCartState = {
  quantity: [],
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalPrice = state.totalPrice + newItem.price;

      if (newItem.quantity === 0 || existingItem?.quantity === 0) {
        return;
      }

      if (existingItem && newItem.addFromCart) {
        existingItem.quantity++;
      }
      if (existingItem && existingItem.quantity > 1) {
        state.totalQuantity = state.totalQuantity + newItem.quantity;
        existingItem.total = existingItem.total + existingItem.price;
      } else if (newItem.quantity > 0) {
        state.totalQuantity = state.totalQuantity + newItem.quantity;
        state.items.push({
          key: newItem.id,
          id: newItem.id,
          image: newItem.image,
          total: newItem.price * newItem.quantity,
          title: newItem.name,
          description: newItem.desc,
          price: newItem.price,
          quantity: newItem.quantity,
        });
      }
      if (newItem.quantity > 0) {
        toast.success(
          `${newItem.quantity} ${newItem.name} added to the cart! `
        );
      }
    },
    removeFromCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity--;
      state.totalPrice = state.totalPrice - existingItem.price;

      if (existingItem?.quantity === 1) {
        state.items.splice(0, 1);
      }
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
      }
    },
    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === itemId
      );
      state.totalQuantity = state.totalQuantity - existingItem?.quantity;

      state.items.splice(existingItemIndex, 1);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
