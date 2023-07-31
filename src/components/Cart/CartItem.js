import classes from "./CartItem.module.css";

export default function CartItem(props) {
  return (
    <div className={classes.cartItem}>
      <div className={classes.lable}>
        <h3>{`${props.foodData.name} x${props.foodData.qty} `}</h3>
        <p>${(props.foodData.price * props.foodData.qty).toFixed(2)}</p>
      </div>
      <div className={classes.cartItemControles}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </div>
  );
}
