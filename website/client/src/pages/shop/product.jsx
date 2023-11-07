import React, { Suspense } from "react";
import BuyNowBtn from "../../components/BuyNowBtn";

function Product(props) {
  const { color, price, frontImg, productName } = props.data;

  return (
    <div className="product">
      <div className="product-container">
        <div className="cart-item">
          <Suspense>
            <img src={frontImg} alt={productName} width="500" height="500" />
          </Suspense>

          <div className="dsp">
            <h4>{productName}</h4>
            <span>{color}</span>
            <h4>R {price}.00</h4>
          </div>
        </div>

        <div>
          <BuyNowBtn />
        </div>
      </div>
    </div>
  );
}

export default Product;
