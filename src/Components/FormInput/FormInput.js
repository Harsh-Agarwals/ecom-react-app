import React from "react";
import "./../FormInput/FormInput.css";

export default function FormInput({ label, ...otherProps }) {
    return (
        <div className="group">
            {label && ( //will run only if we have label
                <label className={`form-input-label shrink`}>{label}</label>
            )}
            <input {...otherProps} className="form-input" />
        </div>
    );
}
