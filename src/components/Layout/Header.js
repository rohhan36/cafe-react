import React from "react";
import classes from "./Header.module.css";
import CartButton from "../Cart/CartButton";
import LogoIcon from "../UI/Icons/LogoIcon";

export default function Header(props) {
  return (
    <div className={`${classes.header} ${props.isIntersecting ? classes.intersecting : ""}`}>
      <div className={classes.logo}>
        <div className={classes.heading}>
          <p>Welcome to</p>
          <h1>Cafe React</h1>
        </div>
        <LogoIcon />
      </div>
      <CartButton onCartButtonClick={props.clickHandeler} />
    </div>
  );
}
