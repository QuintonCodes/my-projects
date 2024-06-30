import { Ghost } from "lucide-react";
import CartItem from "../components/CartItem";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableHeader,
  TableRow,
  TableFooter,
} from "../components/ui/table";
import { useShop } from "../context/ShopContext";

const CartPage = () => {
  const { state } = useShop();

  const calcSubTotals = () => {
    let total = 0;
    state.items.forEach((item) => {
      if (item.product) {
        total += item.quantity * item.product.price;
      }
    });
    return total;
  };

  const calcShipping = () => {
    let total = 0;
    state.items.forEach((item) => {
      if (item.quantity === 0) {
        total;
      } else if (item.product) {
        total += item.product.price * 0.2 * item.quantity;
      }
    });

    return total;
  };

  const calcTotal = () => {
    return calcSubTotals() + calcShipping();
  };

  return (
    <section className="bg-[#292929] text-white py-7 px-10 grid grid-cols-2 min-h-[70vh] items-center max-[1024px]:flex max-[1024px]:flex-wrap">
      <div className="my-5 max-[1024px]:w-full">
        <h2 className="mb-5 font-semibold text-4xl py-3">Shopping Cart</h2>
        {state.items.length > 0 ? (
          <ScrollArea className="h-80">
            <ul role="list" className="-my-6 divide-y divide-gray-300">
              {state.items.map((item) => (
                <CartItem key={item.product?.id} item={item} />
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <h5 className="flex items-center gap-2 text-lg">
            Your cart is empty
            <Ghost className="h-7 w-7 animate-jello" />
          </h5>
        )}
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
              <TableCell>
                R {calcSubTotals()}
                .00
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-[#D6D6D6] hover:bg-opacity-20">
              <TableCell>Shipping</TableCell>
              <TableCell>R {calcShipping()}.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter className="bg-[#D6D6D6] bg-opacity-20">
            <TableRow className="hover:bg-inherit">
              <TableHead className="text-[#7F1310]">Total</TableHead>
              <TableHead className="text-[#7F1310]">
                R {calcTotal()}
                .00
              </TableHead>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default CartPage;
