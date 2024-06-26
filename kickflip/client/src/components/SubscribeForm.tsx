const SubscribeForm = () => {
  return (
    <section className="border-t-2 border-t-black border-solid bg-[#4b4b4b] text-center py-5">
      <h2 className="font-bold text-5xl py-2">Stay Tuned</h2>
      <div className="p-6 items-center flex flex-col text-white max-[450px]:p-0 max-[1024px]:p-2">
        <form className="flex flex-col p-5 bg-transparent border-2 border-solid border-[#ffffff0d] rounded-[10px] max-w-[550px] max-[450px]:max-w-[300px]">
          <span className="text-[#ebebeb] text-[2rem] font-bold tracking-tight leading-8">
            Subscribe to our newsletter
          </span>
          <p className="text-base mt-4 text-[15px] mb-2 text-[#ebebeb]">
            Get email updates to our latest content and sales
          </p>
          <div
            id="email-section"
            className="flex max-w-md mt-4 gap-x-2 max-[450px]:flex-col"
          >
            <input
              placeholder="Enter your email"
              type="email"
              name="email"
              id="email-address"
              autoComplete="email"
              className="bg-[#1b1b1b] border border-solid border-[#808080] rounded-md text-white flex-auto text-sm outline-none py-2 px-[0.875rem] focus:border focus:border-solid focus:border-[#faebd7] placeholder:text-white"
            />
            <button
              type="submit"
              className="bg-[#3a3a3a] hover:bg-[#3d3d3d] transition-colors duration-300 rounded-md border-none text-[#ebebeb] cursor-pointer font-semibold text-sm outline-none py-[0.625rem] px-[0.875rem] max-[450px]:m-3"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SubscribeForm;
