import React from "react";
import { Link } from "react-router-dom";
import classes from "./Category.module.css";
function CategoryCard({ data }) {
  return (
    <div className={classes.category}>
      <Link to={`/category/${encodeURIComponent(data.title)}`}>
        {/* 
      <Link to={`/category/${data.title}`}> */}
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.image} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
