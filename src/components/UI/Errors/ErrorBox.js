import classes from "./ErrorBox.module.css";

export default function ErrorBox(props) {
    return (
        <div className={classes.errorContainer}>
            <div className={classes.errorMsg}>{props.errorMessage}</div>
        </div>
    );
}
