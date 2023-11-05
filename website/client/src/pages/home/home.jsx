import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Features from "../../components/Features";
import ShopNow from "../../components/ShopNow";
import "./home.css";

const Slideshow = lazy(() => import("./slideshow"));

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-info">
          <h2>Our New Brutalist Hoodies</h2>
          <h4>
            Delivered with comfort and style, <br />
            you're guaranteed taking the streets by a storm.
          </h4>
          <Link to="/shop">
            <ShopNow text="Shop Now" />
          </Link>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Slideshow />
        </Suspense>
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
              <span>Find Out!</span>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
