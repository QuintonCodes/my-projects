import React from "react";
import { Link } from "react-router-dom";
import Features from "../../components/Features";
import ShopNow from "../../components/ShopNow";
import "./about.css";

function About() {
  return (
    <>
      <section className="about-us">
        <div className="article">
          <h2>Welcome to KickFlip Store</h2>
          <p>
            Your Ultimate Destination for Authentic Streetwear and
            Skater-Inspired Clothing!
            <br />
            At KickFlip Store, we live and breathe the exhilarating essence of
            urban street culture and the daring spirit of skateboarding. <br />
            Established with a passion for genuine self-expression, we've become
            more than just a clothing brand; <br />
            we're a hub for individuals who want to make a statement, push
            boundaries, and embrace their unique style. <br />
            Our journey began on the streets and skate parks, where the sound of
            wheels on pavement and the pulse of creativity converge. <br />
            Fueled by the raw energy of skaters and urban enthusiasts, KickFlip
            Store was born as a tribute to the dynamic subcultures that shape
            our world. <br />
            From that ollie to the latest freestyle tricks, we understand the
            ethos of the skating community and infuse it into every thread of
            our clothing.
          </p>
          <p>
            What sets KickFlip Store apart is our unwavering commitment to
            authenticity. Each piece of apparel we offer tells a story - a story
            of passion, rebellion, and authenticity. <br />
            Our designs capture the essence of street art, the grit of concrete
            jungles, and the vibrancy of individuality. <br />
            From graphic tees that speak volumes to hoodies that keep you warm
            while you conquer the streets, our collection is a canvas for your
            personal journey. <br />
            Quality is our foundation. We take pride in sourcing the best
            fabrics, ensuring your comfort, durability, and style remain
            uncompromised. Every stitch, every detail, and every print is a
            testament to our dedication to delivering premium streetwear that
            resonates with your lifestyle.
          </p>
          <p>
            But KickFlip Store is more than just clothing; it's a community.
            <br />
            We're united by a shared love for pushing boundaries and defying
            norms. Our brand is a celebration of the skaters, the artists, the
            rebels, and the dreamers <br />
            who challenge conventions and carve their own path. Whether you're
            perfecting your tricks, exploring cityscapes, or simply seeking a
            unique way to express yourself, <br />
            KickFlip Store welcomes you with open arms. Join us as we ride
            through the streets of fashion, one daring move at a time. <br />
            Thank you for being a part of the KickFlip Store family - where
            style meets the streets and individuality reigns supreme.
          </p>
          <div className="btn">
            <Link to="/shop">
              <ShopNow text="Shop Now" />
            </Link>
          </div>
        </div>
      </section>

      <Features />
    </>
  );
}

export default About;
