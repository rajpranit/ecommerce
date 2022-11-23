import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p>
        <Link href="/">A.K. Headphones</Link>
      </p>
      <button type="button" className="cart-icon" onClick={null}>
        <AiOutlineShopping />
        <span className="cart-item-qty">12</span>
      </button>
    </div>
  );
};

export default Navbar;
