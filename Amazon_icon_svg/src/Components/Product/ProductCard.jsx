import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../Currencyformat/Currencyformat";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/Action.type";
function ProductCard({ Product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = Product;
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };
  return (
    <div
      className={`${classes.card_container} ${flex ? classes.product_flexed : ""}`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>

      <div className={classes.info}>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.5} readOnly />
          <small>{rating?.count || 0}</small>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
