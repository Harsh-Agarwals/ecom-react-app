import React, { useContext } from "react";
import Button from "./../Button/Button";
import "./../ProductCard/productcard.css";
import { CartContext } from "./../../Context/carts";

export default function ProductCard({ product }) {
    const { name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext);
    const addProductToCart = () => addItemToCart(product);
    return (
        <div className="product-card-container">
            <img src={`${imageUrl}`} alt={`${name}`} />
            <div className="footer-container">
                <div className="footer">
                    <span className="name">{name}</span>
                    <span className="price">{price}</span>
                </div>
                <Button
                    buttonType="inverted"
                    // onClick={() => {
                    onClick={addProductToCart}
                    // }}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
