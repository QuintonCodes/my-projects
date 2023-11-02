import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Features from "../../components/Features";
import ShopNow from "../../components/ShopNow";
import hero1 from "../../assets/mock-ups/Black-Hoodie-Front.png";
import hero2 from "../../assets/mock-ups/Black-Hoodie-Back.png";
import hero3 from "../../assets/mock-ups/Grey-Hoodie-Front.png";
import hero4 from "../../assets/mock-ups/Grey-Hoodie-Back.png";
import hero5 from "../../assets/mock-ups/White-Hoodie-Front.png";
import hero6 from "../../assets/mock-ups/White-Hoodie-Back.png";
import "./home.css";

function Home() {
  useEffect(() => {
    let slideIndex = 0;

    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      if (slides.length > 0) {
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
          slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 2000);
      }
    }
    showSlides();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-info">
          <h4>Get it now!</h4>
          <h2>Our New Brutalist Hoodies</h2>
          <p>Save 10% when you preorder our new range!</p>
          <Link to="/shop">
            <ShopNow text="Shop Now" />
          </Link>
        </div>

        <div className="slideshow-container">
          <div className="mySlides fade">
            <img src={hero1} alt="Front Black Hoodie" />
          </div>
          <div className="mySlides fade">
            <img src={hero2} alt="Back Black Hoodie" />
          </div>
          <div className="mySlides fade">
            <img src={hero3} alt="Front Grey Hoodie" />
          </div>
          <div className="mySlides fade">
            <img src={hero4} alt="Back Grey Hoodie" />
          </div>
          <div className="mySlides fade">
            <img src={hero5} alt="Front White Hoodie" />
          </div>
          <div className="mySlides fade">
            <img src={hero6} alt="Back White Hoodie" />
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
