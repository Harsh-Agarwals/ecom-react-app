import { createContext, useEffect, useState } from "react";

const addCartItem = (productToAdd, cartItems) => {
    if (cartItems.map((x) => x.name).includes(productToAdd.name)) {
        // cartItems[
        //     cartItems.map((x) => x.name).indexOf(productToAdd.name)
        // ].quantity += 1;
        return cartItems.map((cartItem) =>
            cartItem.name === productToAdd.name
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    } else {
        // console.log(cartItems);
        // cartItems.push({ ...productToAdd, quantity: 1 });
        return [...cartItems, { ...productToAdd, quantity: 1 }];
    }
};

const removeCartItem = (productToRemove, cartItems) => {
    if (productToRemove.quantity === 1) {
        return cartItems.filter((x) => x.name !== productToRemove.name);
    } else {
        // cartItems[
        //     cartItems.map((x) => x.name).indexOf(productToRemove.name)
        // ].quantity -= 1;
        // console.log(cartItems);
        return cartItems.map((cartItem) =>
            cartItem.id === productToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    }
    // return cartItems;
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    totalItems: 0,
    cartCount: 0,
    total: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItem] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);

    // Best price for useEffect is to make it govern 1 single property, so make separate useEffect for each
    useEffect(() => {
        const count = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        setCartCount(count);
        setTotalItems(count);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (price, cartItem) => price + cartItem.quantity * cartItem.price,
            0
        );
        setTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(productToAdd, cartItems));
    };

    const removeItemFromCart = (productToAdd) => {
        setCartItem(removeCartItem(productToAdd, cartItems));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        totalItems,
        setCartItem,
        removeItemFromCart,
        cartCount,
        total,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
