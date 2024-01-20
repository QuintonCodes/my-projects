import { Link } from "react-router-dom";
import { FEATURES } from "../features";
import pro1 from "../assets/mock-ups/Grey-T-Shirt-Front.webp";
import pro2 from "../assets/mock-ups/Black-Hoodie-Back.webp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <section
        className="bg-[#BAB5BA] items-center flex h-full w-full justify-between border-b-2 border-b-black border-solid min-h-screen px-[50px] max-[450px]:flex-wrap max-[450px]:min-h-[80vh] max-[1024px]:min-h-[60vh]"
        id="hero"
      >
        <div className="max-[450px]:mt-5">
          <h2 className="text-6xl font-bold max-[450px]:text-5xl">
            Our New Brutalist Hoodies
          </h2>
          <p className="pt-4 text-xl max-[450px]:text-lg max-[450px]:pt-2">
            Delivered with comfort and style, <br />
            you`re guaranteed taking the streets by a storm.
            <br />
            Embrace the streets with confidence as you envelop yourself
            <br />
            in the cozy allure of our premium hoodies
          </p>
        </div>
      </section>

      <section
        className="text-center border-b-2 border-solid border-b-black py-10"
        id="blog"
      >
        <h2 className="font-bold">Shop Now</h2>
        <div className="flex items-center justify-center space-x-[10rem] my-5 max-[450px]:flex-wrap max-[450px]:space-x-0 max-[1024px]:space-x-[5rem]">
          <div className="group relative max-[450px]:p-5">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75">
              <Link to={`/shop`}>
                <img
                  src={pro1}
                  alt="Shirt"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  height="450px"
                  width="450px"
                />
              </Link>
            </div>
            <span className="flex items-center justify-center text-xl pt-3">
              Shirts
            </span>
          </div>
          <div className="group relative max-[450px]:p-5">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75">
              <Link to={`/shop`}>
                <img
                  src={pro2}
                  alt="Hoodie"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  height="450px"
                  width="450px"
                />
              </Link>
            </div>
            <span className="flex items-center justify-center text-xl pt-3">
              Hoodies
            </span>
          </div>
        </div>
      </section>

      <section>
        <div className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-5xl font-bold tracking-tight text-black">
                Features
              </h1>
            </div>
            <div className="mx-auto mt-8 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {FEATURES.map((feature) => (
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

      <Footer />
    </>
  );
}

export default Home;
