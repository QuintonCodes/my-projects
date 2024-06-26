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
    <section className="my-7 mx-10 grid grid-cols-2 h-[60vh] items-center max-[1024px]:flex max-[1024px]:flex-wrap">
      <div className="my-5 max-[1024px]:w-full">
        <h2 className="mb-5 font-semibold text-4xl">Shopping Cart</h2>
        <ul role="list" className="-my-6 divide-y divide-gray-300">
          <CartItem />
        </ul>
      </div>

      <div className="border-[2px] border-solid border-black mb-[30px] p-[30px] w-full">
        <h3 className="font-semibold text-3xl py-2">Cart Totals</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Cart SubTotals</TableCell>
              <TableCell>R {1000}.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipping</TableCell>
              <TableCell>R {200}.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableHead>Total</TableHead>
              <TableHead>R {1200}.00</TableHead>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default CartPage;
