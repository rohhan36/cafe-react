import classes from "./OrderPopup.module.css";
import ReactDOM from "react-dom";

const OrderPopup = () => {
  const overlay = document.getElementById("overlays");
  return ReactDOM.createPortal(
    <div className={classes.orderPopupBackdrop}>
      <h4 className={classes.orderPopup}>Your order is been placed!</h4>
    </div>,
    overlay
  );
};

export default OrderPopup;
