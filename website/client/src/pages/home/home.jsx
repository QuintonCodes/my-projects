import { Link } from "react-router-dom";
import {
  ComputerDesktopIcon,
  CheckBadgeIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import hero1 from "../../assets/mock-ups/Black-Hoodie-Front.webp";
import hero2 from "../../assets/mock-ups/Black-Hoodie-Back.webp";
import "./home.css";

const features = [
  {
    name: "Shipping",
    description:
      "Shipping is available at an additional cost, ensuring safe and timely delivery of your order to the specified destination.",
    icon: TruckIcon,
  },
  {
    name: "Online Ordering",
    description:
      "Experience the convenience of seamless online ordering, allowing you to effortlessly browse our products and place your desired items in the virtual cart for a hassle-free shopping experience.",
    icon: ComputerDesktopIcon,
  },
  {
    name: "Promotions",
    description:
      "Unlock exclusive savings with our enticing promotional deals, designed to add value to your shopping experience and bring you exciting discounts on a variety of products.",
    icon: ShoppingBagIcon,
  },
  {
    name: "Quality Assurance",
    description:
      "Our commitment to quality assurance guarantees that each product undergoes rigorous testing and inspection, ensuring that you receive nothing but the highest standards of excellence and reliability.",
    icon: CheckBadgeIcon,
  },
];

function Home() {
  return (
    <>
      <section className="items-center flex h-full w-full justify-between border-b-2 border-b-black border-solid min-h-screen px-[50px]">
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
              height="450"
              width="450"
            />

            <img
              className="bg-gray-200 rounded-2xl"
              src={hero1}
              alt="Front Black Hoodie"
              height="450"
              width="450"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-5xl font-bold tracking-tight text-black">
                Features
              </h1>
            </div>
            <div className="mx-auto mt-8 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-[#545484]">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-none">
                        <feature.icon
                          className="h-7 w-7 text-black"
                          aria-hidden="true"
                        />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-black">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section
        className="text-center border-t-2 border-solid border-t-black"
        id="blog"
      >
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
            <button className="items-center border-none cursor-pointer flex justify-center overflow-hidden relative after:h-full after:absolute after:w-0 after:right-0 after:bg-[#f5f5dc] after:content-['_'] after:transition-all after:duration-300 hover:after:left-0 hover:after:right-auto hover:after:w-full bg-[#1b1b1b] rounded-[5px] shadow-[0px_6px_24px_0px] shadow-[#0001]">
              <span className="text-white text-base text-center w-full z-20 font-bold py-[18px] px-[25px] transition-all duration-300">
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
