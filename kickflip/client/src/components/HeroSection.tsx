import ImageSlides from "./ImageSlides";

const HeroSection = () => {
  return (
    <section
      className="bg-[#BAB5BA] items-center flex h-full w-full justify-between border-b-2 border-b-black border-solid min-h-screen px-[50px] max-[450px]:flex-wrap max-[450px]:min-h-[80vh] max-[1024px]:min-h-[60vh]"
      id="hero"
    >
      <div className="max-[450px]:mt-5">
        <h2 className="text-6xl font-bold max-[450px]:text-5xl">
          Our New KickFlip Hoodies
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
      <div className="p-4">
        <ImageSlides />
      </div>
    </section>
  );
};

export default HeroSection;
