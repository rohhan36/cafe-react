import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
    items: [],
    totalAmmount: 0,
};

const cartReducer = (cartState, action) => {
    if (action.type === "ADD") {
        let existingItemIndex = cartState.items.findIndex((item) => item.id === action.item.id);
        let updatedItems;

        if (existingItemIndex >= 0) {
            let updatedItem = cartState.items[existingItemIndex];
            updatedItem.qty += action.item.qty;
            cartState.items[existingItemIndex] = updatedItem;
            updatedItems = cartState.items;
        } else {
            updatedItems = cartState.items.concat(action.item);
        }

        const newTotal = cartState.totalAmmount + action.item.price * action.item.qty;
        return {
            items: updatedItems,
            totalAmmount: newTotal,
        };
    } else if (action.type === "REMOVE") {
        let existingItemIndex = cartState.items.findIndex((item) => item.id === action.id);
        const existingItem = cartState.items[existingItemIndex];
        const updatedTotalAmount = cartState.totalAmmount - existingItem.price;
        let updatedItems;

        if (existingItem.qty === 1) {
            updatedItems = cartState.items.filter((item) => item.id !== action.id);
        } else {
            updatedItems = [...cartState.items];
            updatedItems[existingItemIndex] = { ...existingItem, qty: existingItem.qty - 1 };
        }

        return {
            items: updatedItems,
            totalAmmount: updatedTotalAmount,
        };
    } else if (action.type === "EMPTY") {
        return {
            items: [],
            totalAmmount: 0,
        };
    }

    return defaultState;
};

const CartProvider = (props) => {
    const [cartState, cartDispatch] = useReducer(cartReducer, defaultState);
    const addItemToCartHandeler = (item) => {
        cartDispatch({ type: "ADD", item: item });
    };
    const removeItemToCartHandeler = (id) => {
        cartDispatch({ type: "REMOVE", id: id });
    };

    const emptyCartHandeler = () => {
        cartDispatch({ type: "EMPTY" });
    };

    const cartContext = {
        items: cartState.items,
        totalAmmount: cartState.totalAmmount.toFixed(2),
        addItem: addItemToCartHandeler,
        removeItem: removeItemToCartHandeler,
        emptyCart: emptyCartHandeler,
    };

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
