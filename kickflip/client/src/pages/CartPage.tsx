import CartItem from "../components/CartItem";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableHeader,
  TableRow,
  TableFooter,
} from "../components/ui/table";

const CartPage = () => {
  return (
    <section className="bg-[#292929] text-white py-7 px-10 grid grid-cols-2 min-h-[70vh] items-center max-[1024px]:flex max-[1024px]:flex-wrap">
      <div className="my-5 max-[1024px]:w-full">
        <h2 className="mb-5 font-semibold text-4xl py-3">Shopping Cart</h2>
        <ul role="list" className="-my-6 divide-y divide-gray-300">
          <CartItem />
        </ul>
      </div>

      <div className="border-[2px] border-solid border-black mb-[30px] p-[30px] w-full">
        <h3 className="font-semibold text-3xl py-2">Cart Totals</h3>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#D6D6D6] hover:bg-opacity-20">
              <TableHead className="text-white text-xl">Payment</TableHead>
              <TableHead className="text-white text-xl">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-[#D6D6D6] hover:bg-opacity-20">
              <TableCell>Cart SubTotals</TableCell>
              <TableCell>R {1000}.00</TableCell>
            </TableRow>
            <TableRow className="hover:bg-[#D6D6D6] hover:bg-opacity-20">
              <TableCell>Shipping</TableCell>
              <TableCell>R {200}.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter className="bg-[#D6D6D6] bg-opacity-20">
            <TableRow className="hover:bg-inherit">
              <TableHead className="text-[#7F1310]">Total</TableHead>
              <TableHead className="text-[#7F1310]">R {1200}.00</TableHead>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default CartPage;
