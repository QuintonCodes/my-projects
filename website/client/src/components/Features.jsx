import {
  ComputerDesktopIcon,
  CheckBadgeIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const features = [
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

function Features() {
  return (
    <div className="bg-[#282828] py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white">
            Features
          </h1>
        </div>
        <div className="mx-auto mt-12 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-[#545484]">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-none">
                    <feature.icon
                      className="h-7 w-7 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-white">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Features;
