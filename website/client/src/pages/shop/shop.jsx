import { lazy } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../products";
import "./shop.css";

const Product = lazy(() => import("./product"));

function Shop() {
  const rows = [];
  for (let i = 0; i < PRODUCTS.length; i += 3) {
    rows.push(PRODUCTS.slice(i, i + 3));
  }

  return (
    <section className="shop-container">
      {rows.map((row, index) => (
        <div className="product-row" key={index}>
          {row.map((product) => (
            <Link
              to={`/shop/${product.id}`}
              key={product.id}
              className="shop-item-link"
            >
              <Product data={product} />
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
}

export default Shop;
