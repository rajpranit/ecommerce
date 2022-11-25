import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { TiDeleteOutline } from "react-icons/ti";
import { cartActions } from "../context/cartSlice";
import { uiActions } from "../context/uiSlice";

import { urlFor } from "../lib/client";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const togglecart = () => {
    dispatch(uiActions.toggleCart());
  };

  const cartRef = useRef();
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={togglecart}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">{totalQuantity} items</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button type="button" onClick={togglecart} className="btn">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, i) => (
              <div className="product" key={item.id}>
                <img
                  src={urlFor(item?.image[0])}
                  alt="product"
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.title}</h5>
                    <h4>${item.total}</h4>
                  </div>
                  <div className="flex botton">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => {
                            dispatch(
                              cartActions.removeFromCart({ id: item.id })
                            );
                          }}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => {
                            dispatch(
                              cartActions.addToCart({
                                id: item.id,
                                addFromCart: true,
                              })
                            );
                          }}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => {
                        dispatch(cartActions.removeItem(item.id));
                      }}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
