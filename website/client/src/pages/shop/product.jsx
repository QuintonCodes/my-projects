import React from "react";
import BuyNowBtn from "../../components/BuyNowBtn";

function Product(props) {
  const { color, price, frontImg, productName } = props.data;

  return (
    <div className="product">
      <div className="product-container">
        <div className="cart-item">
          <img src={frontImg} alt={productName} />
          <div className="dsp">
            <h5>{productName}</h5>
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
