const HomePage = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex items-center justify-between xl:pt-8 xl:pb-24">
          {/* Text */}
          <div className="text-center xl:text-left">
            <span className="text-xl">Software Engineer</span>
            <h1 className="h1 mb-6">
              Hello I`m <br />
              <span>Kagiso Jiyane</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              I excel at crafting elegant digital experiences and I am
              proficient in various programming languages and technologies.
            </p>
          </div>
          {/* Photo */}
          <div>photo</div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
