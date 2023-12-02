import hero1 from "../assets/mock-ups/Black-Hoodie-Front.webp";

function Hero() {
  return (
    <div>
      <img
        className="bg-gray-200 rounded-3xl"
        src={hero1}
        alt="Front Black Hoodie"
        height="450"
        width="450"
      />
    </div>
  );
}

export default Hero;
