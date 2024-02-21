import React from "react";
import "./category.css";

export default function Category(props) {
    return (
        <div>
            <div className="category-container">
                <div
                    className="background-image"
                    style={{ backgroundImage: `url(${props.item.imageUrl})` }}
                />
                <div className="category-body-container">
                    <h2>{props.item.title}</h2>
                    <p>Shop Now</p>
                </div>
            </div>
        </div>
    );
}
