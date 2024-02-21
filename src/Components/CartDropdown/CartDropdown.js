import React, { useContext } from "react";
import "./../CartDropdown/cartdropdown.css";
import Button from "./../Button/Button";
import CartItem from "../CartItem/CartItem";
import { CartContext } from "../../Context/carts";
// import Checkout from "../Checkout/Checkout";
import { useNavigate } from "react-router-dom";

export default function CartDropdown() {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate("/checkout");
    };

    // const toCheckout = () => {
    //     <Checkout />;
    // };
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            {/* <Button onClick={toCheckout}>
                <Link to="/checkout" className="btn">
                    GO TO CHECKOUT
                </Link>
            </Button> */}
            <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
        </div>
    );
}
