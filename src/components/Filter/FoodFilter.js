import FilterCategory from "./FilterCategory";
import classes from "./FoodFilter.module.css";
const categories = [
  { name: "All", icon: "https://raw.githubusercontent.com/rohhan36/react-cafe/main/assets/category/categoryAll.png", id: 1 },
  { name: "Burger", icon: "https://raw.githubusercontent.com/rohhan36/react-cafe/main/assets/category/categoryBurger.png", id: 2 },
  { name: "Pizza", icon: "https://raw.githubusercontent.com/rohhan36/react-cafe/main/assets/category/categoryPizza.png", id: 3 },
  { name: "Meal", icon: "https://raw.githubusercontent.com/rohhan36/react-cafe/main/assets/category/categorySalad.png", id: 4 },
  { name: "Desert", icon: "https://raw.githubusercontent.com/rohhan36/react-cafe/main/assets/category/categoryDesert.png", id: 5 },
];

const FoodFilter = (props) => {
  const categorySelectHandeler = (category) => {
    props.onFilterSelect(category);
  };
  return (
    <div className={classes.foodFilter}>
      {categories.map((item) => (
        <FilterCategory data={item} key={item.id} onCategorySelect={categorySelectHandeler} />
      ))}
    </div>
  );
};

export default FoodFilter;
