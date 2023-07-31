import { Fragment } from "react";
import classes from "./CartModal.module.css";
import ReactDOM from "react-dom";

function Modal(props) {
    const backdropClickHandeler = () => {
        props.backdropClick(false);
    };

    const cartClickHandeler = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={classes.backdrop} onClick={backdropClickHandeler}>
            <div className={classes.cartContainer} onClick={cartClickHandeler}>
                {props.children}
            </div>
        </div>
    );
}

export default function CartModal(props) {
    const portalElement = document.getElementById("overlays");

    return <Fragment>{ReactDOM.createPortal(<Modal backdropClick={props.onBackdropClick}>{props.children}</Modal>, portalElement)}</Fragment>;
}
