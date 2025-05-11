import { SubscriptionForm } from "@/components/subscription-form";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-mochiy text-kickflip">KickFlip</h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              Skater inspired clothing for the rebel in you. Express yourself
              with our unique designs.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-kickflip"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-kickflip"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-kickflip"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-kickflip"
              >
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=hoodies"
                  className="text-muted-foreground hover:text-kickflip"
                >
                  Hoodies
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=sweaters"
                  className="text-muted-foreground hover:text-kickflip"
                >
                  Sweaters
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=t-shirts"
                  className="text-muted-foreground hover:text-kickflip"
                >
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/products/new"
                  className="text-muted-foreground hover:text-kickflip"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/products/sale"
                  className="text-muted-foreground hover:text-kickflip"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-kickflip"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-kickflip"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-kickflip"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-kickflip"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-kickflip"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-muted-foreground">
              Get the latest updates, sales and exclusive offers.
            </p>
            <SubscriptionForm />
          </div>
        </div>

        <div className="pt-6 mt-12 text-sm text-center border-t text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} KickFlip. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
