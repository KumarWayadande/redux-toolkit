import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed:false
  },
  reducers: {
    replaceCart(state, action){
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      // console.log(newItem);
      state.changed = true;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.id
      );
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      }
      state.totalQuantity++;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      state.changed = true;
      const existingItem = state.items.find((item) => item.itemId === id);
      console.log(existingItem);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.itemId !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity--;
    },
  },
});



export const cartActions = cartSlice.actions;
export default cartSlice;
