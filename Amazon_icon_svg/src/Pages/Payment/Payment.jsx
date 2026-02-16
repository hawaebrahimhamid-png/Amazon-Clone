import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../Utility/Firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  useCheckout,
  useElements,
  CardElement,
  useStripe,
} from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/Currencyformat/Currencyformat";
import axiosInstance from "../../Api/Axios";

// import (axiosInstance) from "../../Api/Axios"
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0);

  // const total = basket.reduce((amount, item) => amount + item.price * 100, 0);
  // in cents
  const total = basket.reduce((amount, item) => amount + item.price, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setCardError(event.error ? event.error.message : "");
    setCardComplete(event.complete); // ✅ Track completion
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    try {
      setProcessing(true);
      //1.backend||function....> contact to the client
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      //2. react client side conformation

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        },
      );

      if (error) {
        console.log("Payment Error:", error.message);
        setCardError(error.message);
        setProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment Successful ✅");
        setProcessing(false);
        // 3. order firestore save in database ,clear basket
        await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        // empyt the basket
        dispatch({ type: Type.EMPTY_BASKET });

        setProcessing(false);
        navigate("/orders", {
          state: { msg: "You have placed a new order" },
        });
      }
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
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
                  <button
                    type="submit"
                    disabled={!stripe || processing || !cardComplete}
                  >
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
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
