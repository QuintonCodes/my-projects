import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Features from "../../components/Features";
import ShopNow from "../../components/ShopNow";
import hero1 from "../../assets/hero1.png";
import hero2 from "../../assets/hero2.png";
import hero3 from "../../assets/hero3.png";
import "./home.css";

function Home() {
  useEffect(() => {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-img", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active-img";
      setTimeout(showSlides, 2000);
    }
  }, []);

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
            <img src={hero1} alt="hero1" />
          </div>
          <div className="mySlides fade">
            <img src={hero2} alt="hero2" />
          </div>
          <div className="mySlides fade">
            <img src={hero3} alt="hero3" />
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
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
