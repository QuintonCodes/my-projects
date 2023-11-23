import { Link } from "react-router-dom";
import hero1 from "../../assets/mock-ups/Black-Hoodie-Front.webp";
import hero2 from "../../assets/mock-ups/Black-Hoodie-Back.webp";
import Features from "../../components/Features";
import "./home.css";

function Home() {
  return (
    <>
      <section
        className="items-center flex h-full w-full justify-between"
        id="hero"
      >
        <div>
          <h2 className="text-6xl font-bold">Our New Brutalist Hoodies</h2>
          <h4 className="pt-4">
            Delivered with comfort and style, <br />
            you`re guaranteed taking the streets by a storm.
            <br />
            Embrace the streets with confidence as you envelop yourself
            <br />
            in the cozy allure of our premium hoodies
          </h4>
        </div>

        <div className="relative">
          <div className="flex">
            <img
              className="absolute -top-20 -left-40 w-full"
              src={hero2}
              alt="Front Black Hoodie"
              height="500"
              width="500"
            />

            <img
              className="bg-gray-200 rounded-2xl"
              src={hero1}
              alt="Front Black Hoodie"
              height="400"
              width="400"
            />
          </div>
        </div>
      </section>

      <Features />

      <section className="text-center" id="blog">
        <div className="items-center flex flex-col justify-center my-5">
          <article>
            <h2 className="font-bold">What is KickFlip?</h2>
            <p>
              KickFlip is a clothing brand which aims to inspire the youth`s
              style and aesthetic while also contributing to the ever changing
              fashion world.
            </p>
            <p>
              Originally, the core aesthetic of our brand is skate wear.
              Something that grabs the attention of others when seen.
            </p>
            <p>
              As the motto of the brand says{" "}
              <b className="text-[#545484]">Flip It</b>, we will turn things
              around!
            </p>
          </article>
          <Link to="/about">
            <button className="items-center border-none cursor-pointer flex justify-center overflow-hidden relative after:h-full after:absolute after:w-0 after:right-0">
              <span className="text-white text-base text-center w-full z-20">
                Find Out!
              </span>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
