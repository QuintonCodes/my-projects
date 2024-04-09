import image1 from "./assets/mock-ups/Black-Hoodie-Front.webp";
import image2 from "./assets/mock-ups/Black-Hoodie-Back.webp";
import image3 from "./assets/mock-ups/Grey-Hoodie-Front.webp";
import image4 from "./assets/mock-ups/Grey-Hoodie-Back.webp";
import image5 from "./assets/mock-ups/White-Hoodie-Front.webp";
import image6 from "./assets/mock-ups/White-Hoodie-Back.webp";
import image7 from "./assets/mock-ups/Black-T-Shirt-Front.webp";
import image8 from "./assets/mock-ups/Black-T-Shirt-Back.webp";
import image9 from "./assets/mock-ups/Grey-T-Shirt-Front.webp";
import image10 from "./assets/mock-ups/Grey-T-Shirt-Back.webp";
import image11 from "./assets/mock-ups/White-T-Shirt-Front.webp";
import image12 from "./assets/mock-ups/White-T-Shirt-Back.webp";

import {
  ComputerDesktopIcon,
  CheckBadgeIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export const PRODUCTS = [
  {
    id: 1,
    name: "Brutalist Hoodie",
    price: 300.0,
    color: [
      {
        name: "Black",
        class: "bg-black",
      },
    ],
    images: [image1, image2],
    quantity: 0,
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    selectedSize: {
      name: "",
    },
    category: "Hoodie",
    description:
      "Stay effortlessly stylish and comfortable with our classic Black Hoodie. Crafted with care and attention to detail, this versatile wardrobe essential is designed to keep you cozy while exuding an air of understated elegance. Made from a premium blend of high-quality cotton and soft polyester, the hoodie offers a luxuriously smooth feel against your skin. Its deep black hue is both timeless and adaptable, seamlessly integrating into any occasion.",
  },
  {
    id: 2,
    name: "Brutalist Hoodie",
    price: 300.0,
    color: [
      {
        name: "Gray",
        class: "bg-[#acacac]",
      },
    ],
    images: [image3, image4],
    quantity: 0,
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    selectedSize: {
      name: "",
    },
    category: "Hoodie",
    description:
      "Elevate your casual wardrobe with our Grey Hoodie, the epitome of laid-back sophistication. Meticulously crafted for optimal comfort and enduring style, this hoodie seamlessly combines a premium blend of soft cotton and polyester. The soothing grey tone not only adds a touch of modernity but effortlessly complements any ensemble. Embrace the versatility of this wardrobe staple, offering a snug fit and a velvety texture against your skin.",
  },
  {
    id: 3,
    name: "Brutalist Hoodie",
    price: 300.0,
    color: [
      {
        name: "White",
        class: "bg-white",
      },
    ],
    images: [image5, image6],
    quantity: 0,
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    selectedSize: {
      name: "",
    },
    category: "Hoodie",
    description:
      "Indulge in timeless elegance with our White Hoodie, a symbol of effortless style and comfort. Meticulously crafted with the same care and attention as our classic Black Hoodie, this wardrobe essential promises a cozy embrace while maintaining a refined allure. The premium blend of high-quality cotton and soft polyester ensures a luxuriously smooth feel against your skin, elevating your comfort to new heights. The pristine white hue embodies versatility, effortlessly adapting to any occasion.",
  },
  {
    id: 4,
    name: "Brutalist T-Shirt",
    price: 300.0,
    color: [
      {
        name: "Black",
        class: "bg-black",
      },
    ],
    images: [image7, image8],
    quantity: 0,
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    selectedSize: {
      name: "",
    },
    category: "T-Shirt",
    description:
      "Elevate your everyday style with our classic Black T-shirt, a wardrobe essential that effortlessly combines comfort and sophistication. Meticulously crafted with care and attention to detail, this shirt ensures a cozy fit while exuding understated elegance. Fashioned from a premium blend of high-quality cotton and soft polyester, it offers a luxuriously smooth touch against your skin. The deep black hue is timeless and adaptable, making this tee seamlessly integrate into any occasion.",
  },
  {
    id: 5,
    name: "Brutalist T-Shirt",
    price: 300.0,
    color: [
      {
        name: "Gray",
        class: "bg-[#acacac]",
      },
    ],
    images: [image9, image10],
    quantity: 0,
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    selectedSize: {
      name: "",
    },
    category: "T-Shirt",
    description:
      "Experience timeless comfort and style with our classic Grey T-shirt, designed to effortlessly elevate your casual wardrobe. Meticulously crafted with the same care and attention as our iconic Black Hoodie, this versatile piece ensures a cozy and chic look. The premium blend of high-quality cotton and soft polyester delivers a luxuriously smooth feel against your skin, making it a comfortable staple for any day. The subtle grey shade embodies understated elegance, seamlessly integrating into various occasions.",
  },
  {
    id: 6,
    name: "Brutalist T-Shirt",
    price: 300.0,
    color: [
      {
        name: "White",
        class: "bg-white",
      },
    ],
    images: [image11, image12],
    quantity: 0,
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    selectedSize: {
      name: "",
    },
    category: "T-Shirt",
    description:
      "Discover pure simplicity and timeless style with our White T-shirt. Crafted for comfort and versatility, this classic wardrobe staple is designed to complement any look effortlessly. Made from high-quality cotton, it provides a soft and breathable feel against your skin, ensuring comfort throughout the day. The pristine white hue adds a fresh and clean touch, making it an essential piece for casual elegance. Embrace the ease of pairing this white tee with any outfit, creating a foundation for a myriad of stylish ensembles.",
  },
];

export const FEATURES = [
  {
    name: "Shipping",
    description:
      "Shipping is available at an additional cost, ensuring safe and timely delivery of your order to the specified destination.",
    icon: TruckIcon,
  },
  {
    name: "Online Ordering",
    description:
      "Experience the convenience of seamless online ordering, allowing you to effortlessly browse our products and place your desired items in the virtual cart for a hassle-free shopping experience.",
    icon: ComputerDesktopIcon,
  },
  {
    name: "Promotions",
    description:
      "Unlock exclusive savings with our enticing promotional deals, designed to add value to your shopping experience and bring you exciting discounts on a variety of products.",
    icon: ShoppingBagIcon,
  },
  {
    name: "Quality Assurance",
    description:
      "Our commitment to quality assurance guarantees that each product undergoes rigorous testing and inspection, ensuring that you receive nothing but the highest standards of excellence and reliability.",
    icon: CheckBadgeIcon,
  },
];

export const IMAGES = [
  {
    src: image1,
  },
  {
    src: image2,
  },
  {
    src: image3,
  },
  {
    src: image4,
  },
  {
    src: image5,
  },
  {
    src: image6,
  },
  {
    src: image7,
  },
  {
    src: image8,
  },
  {
    src: image9,
  },
  {
    src: image10,
  },
  {
    src: image11,
  },
  {
    src: image12,
  },
];
