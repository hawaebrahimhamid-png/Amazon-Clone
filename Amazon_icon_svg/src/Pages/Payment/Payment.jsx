import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import {
  useCheckout,
  useElements,
  CardElement,
  useStripe,
} from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/Currencyformat/Currencyformat";
function Payment() {
  const [{ user, basket }] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0);
  const total = basket.reduce((amount, item) => {
    return item.price + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = (e) => {
    e.preventDefault();
    1; //backend||function

    //2. react side conformation

    // 3. 0rder firestore save in database ,clear basket
  };
  return (
    <LayOut>
      <div className={classes.Payment_header}>Checkout ({totalItem}) Items</div>

      <section className={classes.Payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React</div>
            <div>Chicago, IL</div>
          </div>
        </div>

        <hr />

        {/* Products */}
        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} Product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        {/* Card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.Payment_card_container}>
            <div className={classes.Payment_details}>
              <form onSubmit={handlePayment} action="">
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.Payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
