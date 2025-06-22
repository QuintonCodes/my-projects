import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const socialMedia = [
  {
    name: "Facebook",
    icon: FaFacebook,
    href: "#",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    href: "#",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "#",
  },
];

const links = [
  {
    name: "MarketPlace",
    array: [
      {
        name: "Browse Products",
        href: "/products",
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
        name: "Fashion",
        href: "/products?category=fashion",
      },
      {
        name: "Gaming & Media",
        href: "/products?category=gaming",
      },
    ],
  },
  {
    name: "Account",
    array: [
      {
        name: "Start Selling",
        href: "/sell",
      },
      {
        name: "My Market",
        href: "/market",
      },
      {
        name: "My Favourites",
        href: "/favourites",
      },
      {
        name: "Messages",
        href: "/messages",
      },
      {
        name: "Account Settings",
        href: "/account",
      },
    ],
  },
  {
    name: "Support",
    array: [
      {
        name: "Help Center",
        href: "/help",
      },
      {
        name: "Safety Tips",
        href: "/safety",
      },
      {
        name: "Terms of Service",
        href: "/terms",
      },
      {
        name: "Privacy Policy",
        href: "/privacy",
      },
      {
        name: "Contact Us",
        href: "/contact",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="w-full px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold text-teal-700">SwopMarket</h3>
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
                  <Icon className="size-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {links.map((link, index) => (
            <div className="space-y-4" key={index}>
              <h3 className="text-lg font-semibold">{link.name}</h3>
              <ul className="space-y-2 text-sm">
                {link.array.map((link) => (
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
          ))}
        </div>

        <div className="pt-8 mt-8 border-t">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SwopMarket. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Mail className="size-4" />
                <span>support@swopmarket.co.za</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="size-4" />
                <span>+27 11 123 4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
