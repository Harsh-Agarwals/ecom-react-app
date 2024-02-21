import React, { useContext } from "react";
import { CartContext } from "./../../Context/carts";
import "./../Checkout/checkout.css";

export default function Checkout() {
    const {
        cartItems,
        setCartItem,
        addItemToCart,
        removeItemFromCart,
        totalItems,
        total,
    } = useContext(CartContext);

    const removeItem = (item) => {
        return () => {
            setCartItem(cartItems.filter((x) => x.id !== item.id));
        };
    };

    return (
        <div className="checkout-container">
            <div className="checkout-item item-head">
                <div>Image</div>
                <div>Item</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>&nbsp;</div>
            </div>
            {cartItems.map((item) => {
                return (
                    <div key={item.id} className="checkout-item">
                        <img src={item.imageUrl} alt={item.name} />
                        <h3>{item.name}</h3>
                        <h3>
                            <button
                                className="incDec"
                                onClick={() => removeItemFromCart(item)}
                            >
                                &lt; &nbsp;{" "}
                            </button>
                            {item.quantity}
                            <button
                                className="incDec"
                                onClick={() => addItemToCart(item)}
                            >
                                {" "}
                                &nbsp; &gt;
                            </button>
                        </h3>
                        <h3>{item.price * item.quantity}</h3>
                        <button
                            onClick={removeItem(item)}
                            style={{ cursor: "pointer" }}
                        >
                            x
                        </button>
                    </div>
                );
            })}
            <div className="total">
                <span>Total Items: {totalItems}</span>
                <span>Total Price: ${total}</span>
            </div>
        </div>
    );
}
