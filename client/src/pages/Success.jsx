import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  function calculateTotal(cart) {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    // setTotal(sum.toFixed(2));
    return sum.toFixed(2);
  }

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = cart.map((item) => {
        console.log(item);
        return item._id;
        // return {
        //   id: item._id,
        //   purchaseQuantity: item.purchaseQuantity,
        // };
      });
      // const productQuantity = cart.map((item) => item.purchaseQuantity);
      console.log(products);
      const total = parseFloat(calculateTotal(cart));
      if (products.length) {
        const { data } = await addOrder({
          variables: { products, total },
        });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }

      setTimeout(() => {
        window.location.assign("/");
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>You will now be redirected to the home page</h2>
    </div>
  );
}

export default Success;
