import React from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../products";
import Product from "./product";
import "./shop.css";

function Shop() {
  const rows = [];
  for (let i = 0; i < PRODUCTS.length; i += 3) {
    rows.push(PRODUCTS.slice(i, i + 3));
  }

  return (
    <>
      <section className="shop-container">
        {rows.map((row, index) => (
          <div className="product-row" key={index}>
            {row.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="shop-item-link"
              >
                <Product data={product} />
              </Link>
            ))}
          </div>
        ))}
      </section>

      <section className="coming-soon">
        <div className="coming-soon-head">
          <h2>Coming Soon!</h2>
        </div>
        <div className="coming-soon-info">
          <h2>The Flip It Jacket</h2>
          <p>
            Flip the world around with our upcoming KickFlip jacket range.
            <br />
            Colours may vary from our inclusive selection to match any style of
            your choice.
          </p>
        </div>
      </section>

      <div>Hello</div>
    </>
  );
}

export default Shop;
