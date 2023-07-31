import { useContext, useState } from "react";
import CartModal from "../UI/Overlays/CartModal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import CartContext from "../../store/cart-context";

export default function Cart(props) {
    const cartCtx = useContext(CartContext);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const isCartEmpty = cartCtx.items.length > 0;

    const cancelHandeler = () => {
        props.clickHandeler(false);
    };

    const orderHandeler = () => {
        setIsCheckingOut(true);
    };

    const onConfirmHandler = (userData) => {
        fetch("https://cafe-react-95e4d-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            body: JSON.stringify({
                order: cartCtx.items,
                user: userData,
            }),
            headers: {
                "Content-type": "application/json",
            },
        });
        props.clickHandeler(false);
        props.onOrderClick();
        cartCtx.emptyCart();
    };

    const cartItemAddHandeler = (item) => {
        cartCtx.addItem({ ...item, qty: 1 });
    };
    const cartItemRemoveHandeler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartControles = (
        <div className={classes.controls}>
            <button className={`${classes.cancel} ${classes.button}`} onClick={cancelHandeler}>
                Cancel
            </button>
            {isCartEmpty && (
                <button className={`${classes.order} ${classes.button}`} onClick={orderHandeler}>
                    Order
                </button>
            )}
        </div>
    );

    return (
        <CartModal onBackdropClick={props.clickHandeler}>
            <div className={classes.cart}>
                <h2>Cart</h2>
                {!isCartEmpty && <p>Add some delicious food in your cart</p>}
                <div className={classes.cartItems}>
                    {cartCtx.items.map((item) => {
                        return (
                            <CartItem
                                foodData={item}
                                key={item.id}
                                onAdd={cartItemAddHandeler.bind(null, item)}
                                onRemove={cartItemRemoveHandeler.bind(null, item.id)}
                            />
                        );
                    })}
                </div>
                <h2>{`Total: ${Math.abs(cartCtx.totalAmmount).toFixed(2)}`}</h2>

                {isCheckingOut && <CheckoutForm onCancelCkick={cancelHandeler} onConfirmClick={onConfirmHandler} />}
                {!isCheckingOut && cartControles}
            </div>
        </CartModal>
    );
}
