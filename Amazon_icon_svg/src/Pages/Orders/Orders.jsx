import React, { useContext, useState, useEffect } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/Firebase";
import ProductCard from "../../Components/Product/ProductCard";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { padding } from "@mui/system";
function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");

      onSnapshot(ordersRef, (snapshot) => {
        console.log(snapshot.docs);
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        );
      });
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders.length == 0 && (
            <div style={{ padding: "20px" }}>you don't have order yet</div>
          )}
          {/* ordered items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={eachOrder.id}>
                  <hr />

                  <p>Order ID: {eachOrder?.id}</p>

                  {eachOrder?.data?.basket.map((order) => (
                    <ProductCard flex={true} Product={order} key={order.id} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
