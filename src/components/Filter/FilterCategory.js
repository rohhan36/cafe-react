import classes from "./FilterCategory.module.css";
const FilterCategory = (props) => {
  const clickHandeler = () => {
    props.onCategorySelect(props.data.name);
  };
  return (
    <div className={classes.filterCategory} onClick={clickHandeler}>
      <img src={props.data.icon} alt={props.data.name} />
      <h5>{props.data.name}</h5>
    </div>
  );
};

export default FilterCategory;
