import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../UI/Icons/CartIcon";
import classes from "./CartButton.module.css";
import CartContext from "../../store/cart-context";

export default function CartButton(props) {
  const cartCtx = useContext(CartContext);
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
  const { items } = cartCtx;

  let numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.qty;
  }, 0);

  const clickHandeler = () => {
    props.onCartButtonClick(true);
  };

  let cartBtnClasses = `${classes.iconContainer} ${buttonIsHighlighted ? classes.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) return;
    setButtonIsHighlighted(true);
    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <div className={cartBtnClasses} onClick={clickHandeler}>
      <button className={classes.cartButton}>
        <CartIcon />
      </button>
      <div className={classes.cartItemCount}>{numberOfCartItems}</div>
    </div>
  );
}
