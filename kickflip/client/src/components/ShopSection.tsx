import Item from "./Item";

const ShopSection = () => {
  return (
    <section className="bg-[#D6D6D6] text-center py-10">
      <h2 className="font-bold pb-5 text-5xl">Shop All</h2>
      <div className="flex items-center justify-center gap-10 py-2">
        <Item text="Hoodies" />
        <Item text="T-Shirts" />
        <Item text="Jerseys" />
      </div>
    </section>
  );
};

export default ShopSection;
