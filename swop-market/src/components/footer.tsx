import { Facebook, Heart, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const socialMedia = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "#",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "#",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "#",
  },
];

const links = {
  website: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Sell",
      href: "/sell",
    },
    {
      name: "Contact Us",
      href: "/contact",
    },
  ],
  shop: [
    {
      name: "All Products",
      href: "/products",
    },
    {
      name: "New Arrivals",
      href: "/products?sort=newest",
    },
    {
      name: "Electronics",
      href: "/products?category=electronics",
    },
    {
      name: "Home Equipment",
      href: "/products?category=home",
    },
    {
      name: "Clothing",
      href: "/products?category=clothing",
    },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SwopMarket</h3>
            <p className="text-sm text-muted-foreground">
              South Africa&apos;s trusted marketplace for buying and selling new
              and pre-owned items.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map(({ icon: Icon, ...social }) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon className="w-5 h-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              {links.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigate</h3>
            <ul className="space-y-2 text-sm">
              {links.website.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SwopMarket. All rights reserved.
          </p>
          <p className="mt-4 text-sm text-muted-foreground md:mt-0 flex items-center">
            Made with{" "}
            <Heart className="size-3 stroke-red-600 fill-red-600 mx-1" /> in
            South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
