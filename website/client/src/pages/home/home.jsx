import React from "react";
import { Link } from "react-router-dom";
import Features from "../../components/Features";
import ShopNow from "../../components/ShopNow";
import "./home.css";

function Home() {
  return (
    <>
      <section className="hero">
        <h4>Get it now!</h4>
        <h2>Our New KickFlip hoodie</h2>
        <p>Save 10% when you preorder our new range!</p>
        <Link to="/shop">
          <ShopNow text="Shop Now" />
        </Link>

        <div className="slideshow-container">
          <div className="mySlides fade">
            <img src="" alt="" />
          </div>
          <div className="mySlides fade">
            <img src="" alt="" />
          </div>
          <div className="mySlides fade">
            <img src="" alt="" />
          </div>
        </div>
      </section>

      <section className="features-head">
        <h2>Features</h2>
      </section>

      <Features />

      <section className="blog">
        <div className="blog-content">
          <article>
            <h2>What is KickFlip?</h2>
            <p>
              KickFlip is a clothing brand which aims to inspire the youth's
              style and aesthetic while also contributing to the ever changing
              fashion world.
            </p>
            <p>
              Originally, the core aesthetic of our brand is skate wear.
              Something that grabs the attention of others when seen.
            </p>
            <p>
              As the motto of the brand says <b>"Flip It"</b>, we will turn
              things around!
            </p>
          </article>
          <Link to="/about">
            <button>
              <span>Learn more</span>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
