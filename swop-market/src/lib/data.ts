import { Car, GamepadIcon, Home, Medal, Shirt, Smartphone } from "lucide-react";

export const routes = [{ href: "/sell", label: "Sell" }];

export const conditionOptions = [
  { value: "new", label: "New" },
  { value: "used_new", label: "Used - Like New" },
  { value: "used_good", label: "Used - Good" },
  { value: "used_fair", label: "Used - Fair" },
  { value: "for_parts", label: "For Parts" },
];

export const deliveryOptions = [
  {
    id: "pickup",
    label: "Pickup",
    description: "Buyer collects from your location",
  },
  { id: "courier", label: "Courier", description: "Send via courier service" },
  {
    id: "post",
    label: "Post Office",
    description: "Send via South African Post Office",
  },
  {
    id: "delivery",
    label: "Personal Delivery",
    description: "Deliver personally within your area",
  },
];

export const categories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "/products/samsung.webp",
    icon: Smartphone,
    count: 4,
  },
  {
    id: "sports",
    name: "Sports",
    image: "/products/skateboard.webp",
    icon: Medal,
    count: 2,
  },
  {
    id: "fashion",
    name: "Fashion",
    image: "/products/jersey.webp",
    icon: Shirt,
    count: 2,
  },
  {
    id: "vehicles",
    name: "Vehicles",
    image: "/products/car.webp",
    icon: Car,
    count: 1,
  },
  {
    id: "gaming",
    name: "Gaming & Media",
    image: "/products/ps5.webp",
    icon: GamepadIcon,
    count: 1,
  },
  {
    id: "home",
    name: "Home",
    image: "/products/kettle.webp",
    icon: Home,
    count: 4,
  },
];
