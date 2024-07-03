import { createContext, useContext, useReducer, ReactNode } from "react";
import { Products } from "../utils/models";

interface ShopItem {
  product?: Products;
  quantity: number;
  size: string;
}

interface ShopState {
  items: ShopItem[];
}

interface ShopAction {
  type:
    | "ADD_TO_CART"
    | "REMOVE_FROM_CART"
    | "INCREMENT_QUANTITY"
    | "DECREMENT_QUANTITY";
  product?: Products;
  size?: string;
}

const ShopContext = createContext<
  { state: ShopState; dispatch: React.Dispatch<ShopAction> } | undefined
>(undefined);

const shopReducer = (state: ShopState, action: ShopAction): ShopState => {
  let existingItem;

  switch (action.type) {
    case "ADD_TO_CART":
      existingItem = state.items.find(
        (item) =>
          item.product?.id === action.product?.id && item.size === action.size
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product?.id === action.product?.id && item.size === action.size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            { product: action.product, quantity: 1, size: action.size || "s" },
          ],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            item.product?.id !== action.product?.id || item.size !== action.size
        ),
      };

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product?.id === action.product?.id && item.size === action.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product?.id === action.product?.id &&
          item.size === action.size &&
          item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    default:
      return state;
  }
};

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(shopReducer, { items: [] });
  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
