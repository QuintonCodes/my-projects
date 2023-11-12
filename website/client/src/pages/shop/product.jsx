import { Suspense } from "react";
import PropTypes from "prop-types";
import BuyNowBtn from "../../components/BuyNowBtn";

function Product({ color, price, frontImg, productName }) {
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

Product.propTypes = {
  color: PropTypes.string.isRequired,
  frontImg: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};

export default Product;
