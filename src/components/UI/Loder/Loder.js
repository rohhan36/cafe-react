import { Fragment } from "react";
import classes from "./Loder.module.css";

export default function Loder() {
    return (
        <Fragment>
            <div className={classes.loaderContainer}>
                <div className={classes.customLoader}></div>
                <div className={classes.lodingText}>Awesome food is on the way...</div>
            </div>
        </Fragment>
    );
}
