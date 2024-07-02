import { cartActions } from "./cart-slice.js";
import { uiActions } from "./ui-slice.js";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-dbdc0-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Error: Error occured while fetching some data...");
      }

      const resData = await response.json();
      return resData;
    };

    try {
      const resData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: resData.items || [],
          totalQuantity: resData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "Cart data fetching failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "Sending Cart Data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-dbdc0-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error:Cannot send the data due an error...");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success",
          message: "Cart data send successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "Cart data sending failed",
        })
      );
    }
  };
};
