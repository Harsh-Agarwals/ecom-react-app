import React from "react";
import Category from "../CategoryItem/Category";
import "./directory.css";

export default function Directory(props) {
    return (
        <div>
            <div className="directory-container">
                {props.categories.map((cat) => {
                    return <Category item={cat} key={cat.id} />;
                })}
            </div>
        </div>
    );
}
