const PRODUCTS = [
  {
    id: 1,
    name: "KickFlip Hoodie",
    price: 300.0,
    quantity: 30,
    category: "Hoodies",
    color: [
      {
        name: "Black",
        inStock: true,
      },
      {
        name: "White",
        inStock: true,
      },
      {
        name: "Grey",
        inStock: true,
      },
    ],
    images: [
      {
        name: "Front Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719342217/neqhlj6h9ssjxoim4oka.png",
      },
      {
        name: "Front White",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719342210/rtmg7yj5xujuteefrwob.png",
      },
      {
        name: "Front Grey",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719342221/bb8yyjshx3nothpl9eaq.png",
      },
      {
        name: "Back Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719342201/uxpawwsvetsmbnw6z166.png",
      },
      {
        name: "Back White",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719342210/ihwfvirzb8egvmfowwf2.png",
      },
      {
        name: "Back Grey",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719342220/uhap7ye8kkoehhzgzgns.png",
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
    name: "KickFlip T-Shirt",
    price: 200.0,
    quantity: 14,
    category: "T-Shirts",
    color: [
      {
        name: "Black",
        inStock: true,
      },
      {
        name: "White",
        inStock: true,
      },
    ],
    images: [
      {
        name: "Front Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343146/Front_Black_T-Shirt_iyxwis.png",
      },
      {
        name: "Front White",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343140/Front_White_T-Shirt_jj6d2y.png",
      },
      {
        name: "Back Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343137/Back_Black_T-Shirt_tau0h4.png",
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
    id: 3,
    name: "KickFlip Zip-up Hoodie",
    price: 350.0,
    quantity: 6,
    category: "Hoodies",
    color: [
      {
        name: "Black",
        inStock: true,
      },
      {
        name: "White",
        inStock: true,
      },
    ],
    images: [
      {
        name: "Front Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343392/Front_Black_Zipup_Hoodie_wjtptc.png",
      },
      {
        name: "Front White",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343406/Front_White_Zipup_Hoodie_zzl5yz.png",
      },
      {
        name: "Back Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343389/Back_Black_Zipup_Hoodie_v2uwof.png",
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
    id: 4,
    name: "KickFlip 1/4 Zip-up Jersey",
    price: 400.0,
    quantity: 8,
    category: "Jersey",
    color: [
      {
        name: "Black",
        inStock: true,
      },
      {
        name: "Grey",
        inStock: true,
      },
    ],
    images: [
      {
        name: "Front Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343395/Front_Black_1-4_Sweatshirt_zvclog.png",
      },
      {
        name: "Front Grey",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343404/Front_Grey_1-4_Sweatshirt_yfwusy.png",
      },
      {
        name: "Back Black",
        src: "https://res.cloudinary.com/djyh1j8bs/image/upload/v1719343392/Back_Black_1-4_Sweatshirt_xguab7.png",
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
