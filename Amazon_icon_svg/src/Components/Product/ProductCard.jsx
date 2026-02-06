import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../Currencyformat/Currencyformat";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";

function ProductCard({ Product }) {
  const { image, title, id, rating, price } = Product;
  return (
    <div className={classes.card_container}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>

        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate || 0} precision={0.5} readOnly />

          {/* count */}
          <small>{rating?.count || 0}</small>

          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
      </div>
      <button className={classes.button}>add to cart</button>
    </div>
  );
}

export default ProductCard;
