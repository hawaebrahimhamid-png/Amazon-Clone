import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import { useParams } from "react-router-dom";
import LayOut from "../../Components/LayOut/LayOut";
import Category from "../../Components/Category/Category";
import axios from "axios";
import { productUrl } from "../../Api/EndPoints";
import ProductCard from "../../Components/Product/ProductCard";
function Results() {
  const [Results, setResults] = useState([]);
  const { CategoryName } = useParams();
  const decodedCategory = decodeURIComponent(CategoryName);

  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${decodedCategory}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  }, [decodedCategory]);

  // const { CategoryName } = useParams();

  // useEffect(() => {
  //   axios
  //     .get(`${productUrl}/products/category/${CategoryName}`)
  //     .then((res) => {
  //       setResults(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [CategoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}> Results</h1>
        {/* <p style={{ padding: "30px" }}>Category/{CategoryName}</p> */}
        <p style={{ padding: "30px" }}>Category/{decodedCategory}</p>
        <hr />
        <div className={classes.products_container}>
          {Results?.map((product) => (
            <ProductCard key={product.id} Product={product} />
          ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
