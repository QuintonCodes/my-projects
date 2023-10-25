import React from "react";
import img1 from "../assets/shipping.png";
import img2 from "../assets/online_ordering.png";
import img3 from "../assets/promotion.png";
import img4 from "../assets/quality.png";
import "./features.css";

function Features() {
  return (
    <section className="features section-p1">
      <div className="fe-box">
        <img src={img1} alt="Shipping" />
        <h3>Shipping</h3>
        <p>We provide shipping at a cost</p>
      </div>
      <div className="fe-box">
        <img src={img2} alt="Online order" />
        <h3>Online order</h3>
        <p>Order online anywhere</p>
      </div>
      <div className="fe-box">
        <img src={img3} alt="Promotion" />
        <h3>Promotion</h3>
        <p>Enjoy our variety of promotions and sales</p>
      </div>
      <div className="fe-box">
        <img src={img4} alt="Quality Assurance" />
        <h3>Quality Assurance</h3>
        <p>We promise to deliver quality products</p>
      </div>
    </section>
  );
}

export default Features;
