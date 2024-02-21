import React, { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "./../../Assets/crown.svg";
import "./../Navigation/Navigation.css";

import { UserContext } from "./../../Context/context";
import { CartContext } from "./../../Context/carts";

import { userSignOut } from "./../../Utils/Firebase/firebase";

import CartIcon from "./../../Components/CartIcon/CartIcon";
import CartDropdown from "./../../Components/CartDropdown/CartDropdown";

export default function Navigation() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    console.log(currentUser);

    const signOutUser = async () => {
        await userSignOut();
        // setCurrentUser(null);
    };
    return (
        <Fragment>
            <div className="navigation">
                <Link to="/" className="logo-container">
                    <Logo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {currentUser ? (
                        <>
                            <span className="nav-link" onClick={signOutUser}>
                                SIGN OUT
                            </span>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/auth">
                                SIGN UP
                            </Link>
                            <CartIcon />
                        </>
                    )}
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
}
