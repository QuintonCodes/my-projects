import Item from "./Item";

const ShopSection = () => {
  return (
    <section className="bg-[#4b4b4b] text-center py-10">
      <h2 className="font-bold pb-5 text-5xl">Shop All</h2>
      <div className="flex items-center justify-center gap-10">
        <Item text="Hoodies" />
        <Item text="T-Shirts" />
        <Item text="Jerseys" />
      </div>
    </section>
  );
};

export default ShopSection;
