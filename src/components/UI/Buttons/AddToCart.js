import classes from "./AddToCard.module.css";
export default function AddToCart(props) {
  const clickHandeler = () => {
    props.onClick();
  };
  return (
    <button className={classes.addToCartBtn} onClick={clickHandeler}>
      Add to Cart
    </button>
  );
}
