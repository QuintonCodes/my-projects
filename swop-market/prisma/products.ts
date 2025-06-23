import {
  deliveryOptions,
  productCondition,
  productStatus,
} from "@prisma/client";

export const products: Array<{
  id: string;
  name: string;
  description: string;
  images: string[];
  seller: string;
  category: string;
  condition: productCondition;
  location: string;
  deliveryOptions: deliveryOptions[];
  price: number;
  originalPrice?: number;
  status: productStatus;
  brand?: string;
  model?: string;
  createdAt: Date;
  reviews?: Array<{
    id: string;
    user: string;
    rating: number;
    comment?: string;
    date: Date;
  }>;
}> = [
  {
    id: "1",
    name: "Vintage Leather Sofa",
    description:
      "Beautiful vintage leather sofa in excellent condition. Perfect for any living room.",
    price: 4500,
    images: ["/products/vintage-sofa.webp"],
    seller: "FurnitureFinds",
    category: "Home",
    condition: "used_new",
    location: "Cape Town",
    deliveryOptions: ["pickup", "local_delivery"],
    createdAt: new Date("2024-06-01T10:00:00Z"),
    originalPrice: 8000,
    status: "active",
    brand: "VintageCo",
    reviews: [
      {
        id: "1",
        user: "Alice",
        rating: 5,
        comment: "Absolutely love this sofa! It's so comfortable and stylish.",
        date: new Date("2024-06-05"),
      },
      {
        id: "2",
        user: "Bob",
        rating: 4,
        comment:
          "Great quality, but the color is slightly darker than in the pictures.",
        date: new Date("2024-06-07"),
      },
    ],
  },
  {
    id: "2",
    name: "Samsung Galaxy S22",
    description:
      "Samsung Galaxy S22 in perfect condition. Includes charger and original box.",
    price: 8999,
    images: ["/products/samsung.webp"],
    seller: "TechTraders",
    category: "Electronics",
    condition: "used_good",
    location: "Johannesburg",
    deliveryOptions: ["pickup", "courier", "local_delivery"],
    createdAt: new Date("2024-06-02T09:00:00Z"),
    originalPrice: 12000,
    status: "active",
    brand: "Samsung",
    model: "S22",
    reviews: [
      {
        id: "1",
        user: "Charlie",
        rating: 5,
        comment: "Great phone! Fast and reliable. Highly recommend.",
        date: new Date("2024-06-10"),
      },
      {
        id: "2",
        user: "Diana",
        rating: 4,
        comment:
          "Good phone, but the battery life could be better. Overall satisfied.",
        date: new Date("2024-06-12"),
      },
    ],
  },
  {
    id: "3",
    name: "Mountain Bike - Trek",
    description:
      "Trek mountain bike with front suspension. Great for trails and city riding.",
    price: 6500,
    images: ["/products/bicycle.webp"],
    seller: "OutdoorGear",
    category: "Sports",
    condition: "used_fair",
    location: "Durban",
    deliveryOptions: ["pickup", "courier"],
    createdAt: new Date("2024-06-03T09:15:00Z"),
    originalPrice: 9000,
    status: "active",
    brand: "Trek",
    model: "X-Caliber 8",
    reviews: [
      {
        id: "1",
        user: "Ethan",
        rating: 4,
        comment: "Good bike for the price. A bit heavy but rides well.",
        date: new Date("2024-06-13"),
      },
      {
        id: "2",
        user: "Fiona",
        rating: 3,
        comment:
          "Decent bike, but had to replace the tires after a month. Not the best quality.",
        date: new Date("2024-06-15"),
      },
    ],
  },
  {
    id: "4",
    name: "Handmade Ceramic Vase",
    description:
      "Beautiful handmade ceramic vase. Perfect for flowers or as a decorative piece.",
    price: 350,
    images: ["/products/vase.webp"],
    seller: "ArtisanCrafts",
    category: "Home",
    condition: "new",
    location: "Pretoria",
    deliveryOptions: ["pickup", "local_delivery"],
    createdAt: new Date("2024-06-04T16:20:00Z"),
    status: "active",
    brand: "Artisan",
  },
  {
    id: "5",
    name: "Vintage Vinyl Records Collection",
    description:
      "Collection of 20 vintage vinyl records from the 70s and 80s. Various artists.",
    price: 1200,
    images: ["/products/vinyl.webp"],
    seller: "MusicMasters",
    category: "Electronics",
    condition: "used_fair",
    location: "Port Elizabeth",
    deliveryOptions: ["pickup", "courier"],
    createdAt: new Date("2024-06-05T11:30:00Z"),
    originalPrice: 2000,
    status: "sold",
    brand: "Various",
    reviews: [
      {
        id: "1",
        user: "Jack",
        rating: 5,
        comment: "Great collection! Love the classic hits.",
        date: new Date("2024-06-16"),
      },
      {
        id: "2",
        user: "Kathy",
        rating: 4,
        comment:
          "Good condition, but a few records have scratches. Still a great buy.",
        date: new Date("2024-06-18"),
      },
    ],
  },
  {
    id: "6",
    name: "Professional DSLR Camera",
    description:
      "Canon EOS 5D Mark IV with 24-70mm lens. Perfect for professional photography.",
    price: 15000,
    images: ["/products/camera.webp"],
    seller: "PhotoPro",
    category: "Electronics",
    condition: "used_new",
    location: "Bloemfontein",
    deliveryOptions: ["pickup", "courier", "local_delivery"],
    createdAt: new Date("2024-06-06T13:45:00Z"),
    originalPrice: 25000,
    status: "active",
    brand: "Canon",
    model: "EOS 5D Mark IV",
    reviews: [
      {
        id: "1",
        user: "Liam",
        rating: 5,
        comment:
          "Amazing camera! The image quality is stunning. Highly recommend for professionals.",
        date: new Date("2024-06-19"),
      },
      {
        id: "2",
        user: "Mia",
        rating: 4,
        comment:
          "Great camera, but the battery life could be better. Overall very satisfied.",
        date: new Date("2024-06-20"),
      },
    ],
  },
  {
    id: "7",
    name: "Broken iPhone 12 for Parts",
    description:
      "iPhone 12 with cracked screen and battery issues. Good for parts or repair.",
    price: 2500,
    images: ["/products/broken-iphone.webp"],
    seller: "PhoneRepair",
    category: "Electronics",
    condition: "for_parts",
    location: "Johannesburg",
    deliveryOptions: ["pickup", "courier", "meet_in_person"],
    createdAt: new Date("2024-06-07T09:30:00Z"),
    originalPrice: 12000,
    status: "draft",
    brand: "Apple",
    model: "iPhone 12",
    reviews: [
      {
        id: "1",
        user: "Nina",
        rating: 3,
        comment:
          "Good for parts, but I expected more. The battery was completely dead.",
        date: new Date("2024-06-21"),
      },
      {
        id: "2",
        user: "Oscar",
        rating: 2,
        comment:
          "Not worth it. The screen was more damaged than described. Disappointed.",
        date: new Date("2024-06-22"),
      },
    ],
  },
  {
    id: "8",
    name: "Brand New PlayStation 5",
    description:
      "Sealed PlayStation 5 Disc Edition. Never opened, with full warranty.",
    price: 13999,
    images: ["/products/ps5.webp"],
    seller: "GameZone",
    category: "Gaming",
    condition: "new",
    location: "Cape Town",
    deliveryOptions: ["pickup", "courier", "local_delivery"],
    createdAt: new Date("2024-06-08T15:45:00Z"),
    status: "active",
    brand: "Sony",
    model: "PlayStation 5",
  },
  {
    id: "9",
    name: "Antique Wooden Desk",
    description:
      "Beautiful antique wooden desk from the 1920s. Some wear but in good condition.",
    price: 7500,
    images: ["/products/desk.webp"],
    seller: "VintageFinds",
    category: "Home",
    condition: "used_good",
    location: "Durban",
    deliveryOptions: ["pickup", "local_delivery"],
    createdAt: new Date("2024-06-09T11:20:00Z"),
    originalPrice: 12000,
    status: "active",
    brand: "AntiqueCo",
    reviews: [
      {
        id: "1",
        user: "Rachel",
        rating: 5,
        comment:
          "Absolutely love this desk! It's a perfect addition to my home office.",
        date: new Date("2024-06-23"),
      },
    ],
  },
  {
    id: "10",
    name: "Designer Handbag",
    description:
      "Authentic designer handbag, barely used. Comes with dust bag and authenticity card.",
    price: 25000,
    images: ["/products/handbag.webp"],
    seller: "LuxuryItems",
    category: "Fashion",
    condition: "used_new",
    location: "Sandton",
    deliveryOptions: ["pickup", "courier", "local_delivery"],
    createdAt: new Date("2024-06-10T14:15:00Z"),
    originalPrice: 40000,
    status: "active",
    brand: "Gucci",
    reviews: [
      {
        id: "1",
        user: "Sophia",
        rating: 5,
        comment:
          "Gorgeous handbag! The quality is amazing and it looks brand new.",
        date: new Date("2024-06-24"),
      },
      {
        id: "2",
        user: "Tom",
        rating: 4,
        comment:
          "Very stylish and practical. A bit pricey, but worth it for the brand.",
        date: new Date("2024-06-25"),
      },
    ],
  },
  {
    id: "11",
    name: "Toyota Corolla",
    description:
      "2018 Toyota Corolla, 50,000 km, full service history. Excellent condition.",
    price: 85000,
    images: ["/products/car.webp"],
    seller: "CarDeals",
    category: "Vehicles",
    condition: "used_good",
    location: "Cape Town",
    deliveryOptions: ["pickup", "local_delivery", "meet_in_person"],
    createdAt: new Date("2024-06-11T10:00:00Z"),
    originalPrice: 150000,
    status: "active",
    brand: "Toyota",
    model: "Corolla",
    reviews: [
      {
        id: "1",
        user: "Uma",
        rating: 5,
        comment:
          "Great car! Very reliable and fuel-efficient. Highly recommend.",
        date: new Date("2024-06-26"),
      },
    ],
  },
  {
    id: "12",
    name: "KickFlip Quarter Zip Jersey",
    description:
      "Stylish quarter zip jersey from KickFlip. Perfect for casual wear.",
    price: 500,
    images: ["/products/jersey.webp"],
    seller: "FashionHub",
    category: "Fashion",
    condition: "new",
    location: "Johannesburg",
    deliveryOptions: ["pickup", "courier", "local_delivery"],
    createdAt: new Date("2024-06-12T12:30:00Z"),
    status: "active",
    brand: "KickFlip",
  },
  {
    id: "13",
    name: "Smeg Kettle",
    description: "Stylish Smeg kettle in pastel blue. Perfect for any kitchen.",
    price: 1500,
    images: ["/products/kettle.webp"],
    seller: "HomeEssentials",
    category: "Home",
    condition: "new",
    location: "Pretoria",
    deliveryOptions: ["pickup", "courier", "local_delivery"],
    createdAt: new Date("2024-06-13T09:00:00Z"),
    brand: "Smeg",
    status: "active",
  },
  {
    id: "14",
    name: "Skateboard",
    description:
      "High-quality skateboard with custom design. Perfect for tricks and cruising.",
    price: 1200,
    images: ["/products/skateboard.webp"],
    seller: "SkateShop",
    category: "Sports",
    condition: "new",
    location: "Durban",
    deliveryOptions: ["pickup", "courier", "local_delivery"],
    createdAt: new Date("2024-06-14T11:00:00Z"),
    brand: "SkateCo",
    status: "active",
  },
];
