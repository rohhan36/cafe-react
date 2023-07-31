import React, { useRef, useState, useContext, useEffect } from "react";
import classes from "./FoodItem.module.css";
import Counter from "../UI/Buttons/Counter";
import AddToCart from "../UI/Buttons/AddToCart";
import CartContext from "../../store/cart-context";

export default function FoodItem(props) {
  const [isValidNumberOfItem, setIsValidNumberOfItem] = useState(false);
  const [ counterResetToggle, setCounterResetToggle ] = useState( false );
  const [ imageLoaded, setImageLoaded ] = useState( false );
  const quantityRef = useRef();
  const cartCtx = useContext(CartContext);

  useEffect( () => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded( true );
    }

    img.src = props.foodData.imgSrc;
  }, [props.foodData.imgSrc])

  const addToCartHandeler = () => {
    const foodItemData = {
      id: props.foodData.id,
      name: props.foodData.name,
      price: props.foodData.price,
      qty: +quantityRef.current.innerText,
    };

    if (foodItemData.qty === 0) {
      setIsValidNumberOfItem(true);
      setInterval(() => {
        setIsValidNumberOfItem(false);
      }, 5000);
    } else {
      setIsValidNumberOfItem(false);
      setCounterResetToggle(!counterResetToggle);
      cartCtx.addItem(foodItemData);
    }
  };

  const blurHashContent = ( <div className={classes.blurhash}></div> );

  let imageContent;
  if ( imageLoaded ) {
    imageContent  = <img src={props.foodData.imgSrc} alt={props.foodData.name} loading="lazy" />
  } else {
    imageContent = blurHashContent;
  }

  return (
    <div className={ classes.foodItem }>
      { imageContent }
      <h4 className={classes.foodTitle}>{props.foodData.name}</h4>
      <p className={classes.foodDesc}>{props.foodData.desc}</p>
      <h3 className={classes.foodPrice}>${props.foodData.price}</h3>
      <Counter ref={quantityRef} default={0} reset={counterResetToggle} />
      <AddToCart onClick={addToCartHandeler} />
      {isValidNumberOfItem && <p className={classes.errorMsg}>Please select number of items</p>}
    </div>
  );
}
