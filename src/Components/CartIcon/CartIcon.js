import React, { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "./../../Assets/shopping-bag.svg";
import "./../CartIcon/cartIcon.css";
import { CartContext } from "./../../Context/carts";

export default function CartIcon() {
    const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);
    const totalItems = cartItems
        .map((x) => x.quantity)
        .reduce((a, b) => a + b, 0);
    const toggle = () => {
        setIsCartOpen(!isCartOpen);
    };
    return (
        <div className="cart-icon-container" onClick={toggle}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{totalItems}</span>
        </div>
    );
}
