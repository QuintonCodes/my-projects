import { FC } from "react";

interface CartSummaryProps {
  cartSubTotal: number;
  totalShipping: number;
  totalCost: number;
}

const CartSummary: FC<CartSummaryProps> = ({
  cartSubTotal,
  totalShipping,
  totalCost,
}) => {
  return (
    <table className="border-collapse mb-5 w-full">
      <tbody>
        <tr>
          <td className="border border-solid border-black p-[10px] w-1/2">
            Cart SubTotals
          </td>
          <td className="border border-solid border-black p-[10px] w-1/2">
            R {cartSubTotal}.00
          </td>
        </tr>
        <tr>
          <td className="border border-solid border-black p-[10px] w-1/2">
            Shipping
          </td>
          <td className="border border-solid border-black p-[10px] w-1/2">
            R {totalShipping}.00
          </td>
        </tr>
        <tr>
          <td className="border border-solid border-black p-[10px] w-1/2">
            <strong>Total</strong>
          </td>
          <td className="border border-solid border-black p-[10px] w-1/2">
            <strong>R {totalCost}.00</strong>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartSummary;
