import { useRef, useState } from "react";
import classes from "./CheckoutForm.module.css";

const CheckoutForm = (props) => {
    const [isFormInvalid, setIsFromInvalid] = useState(false);
    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();

    const inputChangeHandler = () => {
        setIsFromInvalid(false);
    };

    const checkoutFormSubmitHandler = (e) => {
        e.preventDefault();
        const inputName = nameRef.current.value;
        const inputStreet = streetRef.current.value;
        const inputPostal = postalRef.current.value;

        const formIsValid = inputName.trim() !== "" && inputStreet.trim() !== "" && inputPostal.trim().length === 6;
        if (!formIsValid) {
            setIsFromInvalid(true);
            return;
        }

        const usetrData = {
            name: inputName.trim(),
            street: inputStreet.trim(),
            postal: +inputPostal.trim(),
        };

        props.onConfirmClick(usetrData);
    };

    return (
        <form className={classes.checkoutFrom} onSubmit={checkoutFormSubmitHandler}>
            {isFormInvalid && <p className={classes.formErrorText}>Please enter valid details</p>}
            <input placeholder="Name" ref={nameRef} type="text" onChange={inputChangeHandler} />
            <input placeholder="Street" ref={streetRef} type="text" onChange={inputChangeHandler} />
            <input placeholder="Postal Code" ref={postalRef} type="number" onChange={inputChangeHandler} />
            <div className={classes.checkoutControles}>
                <button type="button" className={classes.cancel} onClick={props.onCancelCkick}>
                    Cancel
                </button>
                <button type="submit" className={classes.confirm}>
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
