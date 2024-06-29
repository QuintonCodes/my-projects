const PRODUCTS = [
  {
    id: 1,
    name: "KickFlip Hoodie",
    price: 300.0,
    quantity: 30,
    category: "Hoodies",
    color: {
      name: "Black",
      class: "bg-black",
      inStock: true,
    },
    images: [
      {
        name: "Front Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719465822/Front_Black_Hoodie_mh3rm4.png",
      },
      {
        name: "Back Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719465827/Back_Black_Hoodie_exip5v.png",
      },
    ],
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false },
    ],
  },
  {
    id: 2,
    name: "KickFlip Hoodie",
    price: 300.0,
    quantity: 30,
    category: "Hoodies",
    color: {
      name: "White",
      class: "bg-white",
      inStock: true,
    },

    images: [
      {
        name: "Front White",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719465826/Front_White_Hoodie_fmlpde.png",
      },
      {
        name: "Back White",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719465826/Back_White_Hoodie_fjijvi.png",
      },
    ],
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false },
    ],
  },
  {
    id: 3,
    name: "KickFlip Hoodie",
    price: 300.0,
    quantity: 30,
    category: "Hoodies",
    color: {
      name: "Grey",
      class: "bg-[#acacac]",
      inStock: true,
    },

    images: [
      {
        name: "Front Grey",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719465827/Front_Grey_Hoodie_tju39v.png",
      },
      {
        name: "Back Grey",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719465826/Back_Grey_Hoodie_gcfz2a.png",
      },
    ],
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false },
    ],
  },
  {
    id: 4,
    name: "KickFlip T-Shirt",
    price: 200.0,
    quantity: 6,
    category: "T-Shirts",
    color: [
      {
        name: "Black",
        class: "bg-black",
        inStock: true,
      },
    ],
    images: [
      {
        name: "Front Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343146/Front_Black_T-Shirt_iyxwis.png",
      },
      {
        name: "Back Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343137/Back_Black_T-Shirt_tau0h4.png",
      },
    ],
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false },
    ],
  },
  {
    id: 5,
    name: "KickFlip T-Shirt",
    price: 200.0,
    quantity: 6,
    category: "T-Shirts",
    color: [
      {
        name: "White",
        class: "bg-white",
        inStock: true,
      },
    ],
    images: [
      {
        name: "Front White",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343140/Front_White_T-Shirt_jj6d2y.png",
      },
      {
        name: "Back White",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343144/Back_White_T-Shirt_gvgdz9.png",
      },
    ],
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false },
    ],
  },
  {
    id: 6,
    name: "KickFlip Zip Hoodie",
    price: 400.0,
    quantity: 6,
    category: "Jersey",
    color: [
      {
        name: "Black",
        class: "bg-black",
        inStock: true,
      },
    ],
    images: [
      {
        name: "Front Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343392/Front_Black_Zipup_Hoodie_wjtptc.png",
      },
      {
        name: "Back Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343389/Back_Black_Zipup_Hoodie_v2uwof.png",
      },
    ],
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
  },
  {
    id: 7,
    name: "KickFlip Zip Hoodie",
    price: 400.0,
    quantity: 6,
    category: "Jersey",
    color: [
      {
        name: "White",
        class: "bg-white",
        inStock: true,
      },
    ],
    images: [
      {
        name: "Front White",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343406/Front_White_Zipup_Hoodie_zzl5yz.png",
      },
      {
        name: "Back White",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343407/Back_White_Zipup_Hoodie_vnnhtm.png",
      },
    ],
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
  },
  {
    id: 8,
    name: "KickFlip 1/4 Zip",
    price: 400.0,
    quantity: 8,
    category: "Jersey",
    color: [
      {
        name: "Black",
        class: "bg-black",
        inStock: true,
      },
    ],
    images: [
      {
        name: "Front Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343395/Front_Black_1-4_Sweatshirt_zvclog.png",
      },
      {
        name: "Back Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343392/Back_Black_1-4_Sweatshirt_xguab7.png",
      },
    ],
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
  },
  {
    id: 9,
    name: "KickFlip 1/4 Zip",
    price: 400.0,
    quantity: 8,
    category: "Jersey",
    color: [
      {
        name: "Grey",
        class: "bg-[#acacac]",
        inStock: true,
      },
    ],
    images: [
      {
        name: "Front Grey",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343404/Front_Grey_1-4_Sweatshirt_yfwusy.png",
      },
      {
        name: "Back Grey",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343405/Back_Grey_1-4_Sweatshirt_e8hjw2.png",
      },
    ],
    size: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
  },
];

module.exports = PRODUCTS;
