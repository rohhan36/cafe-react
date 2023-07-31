import React, { Fragment, useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import FoodFilter from "../Filter/FoodFilter";
import classes from "./FoodList.module.css";
import Loder from "../UI/Loder/Loder";
import ErrorBox from "../UI/Errors/ErrorBox";

export default function FoodList(props) {
    const [foodCategory, setFoodCategory] = useState("All");
    const [foodData, setFoodData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState("");

    useEffect(() => {
        const fetchFoodData = async () => {
            const res = await fetch("https://cafe-react-95e4d-default-rtdb.firebaseio.com/foodData.json");

            if (!res.ok) {
                throw new Error("Spmething went wrong!");
            }

            const resData = await res.json();
            const loadedFoodData = [];
            for (let key in resData) {
                for (let dataItem of resData[key]) {
                    const foodDataItem = {
                        ...dataItem,
                    };
                    loadedFoodData.push(foodDataItem);
                }
            }
            setIsLoading(false);
            setFoodData(loadedFoodData);
        };

        fetchFoodData().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    const filterSelectHandeler = (category) => {
        setFoodCategory(category);
    };

    const filteredFoodData = foodData.filter((item) => {
        if (foodCategory === "All") return true;
        else return item.category === foodCategory.toLowerCase();
    });

    if (isLoading) {
        return <Loder />;
    }

    if (httpError) {
        return <ErrorBox errorMessage={httpError} />;
    }

    return (
        <Fragment>
            <FoodFilter onFilterSelect={filterSelectHandeler} />
            <div className={classes.foodList}>
                {filteredFoodData.map((foodItem) => {
                    return <FoodItem foodData={foodItem} key={foodItem.id} />;
                })}
            </div>
        </Fragment>
    );
}
