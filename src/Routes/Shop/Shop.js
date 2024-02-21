import React, { useContext } from "react";
// import SHOP_DATA from "../../shop-data.json";
import { ProductsContext } from "../../Context/productsContext";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./../Shop/shop.css";

export default function Shop() {
    const { products } = useContext(ProductsContext);
    return (
        <div className="products-container">
            {products.map((product) => {
                return (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                );
            })}
        </div>
    );
}
