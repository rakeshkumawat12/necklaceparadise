import hm_ts_1 from "../assets/hm_ts_1.jpg";
import hm_ts_2 from "../assets/hm_ts_2.jpg";
import hm_ts_3 from "../assets/hm_ts_3.jpg";

const callouts = [
  {
    name: "Hearts Aglow Diamond Necklace",
    description: "₹ 76,100",
    imageSrc: hm_ts_1,
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "/product/6751f11a06ce1e0a1e9975c2",
  },
  {
    name: "Mesmerising Diamond Necklace Set",
    description: "₹ 2,32,500",
    imageSrc: hm_ts_2,
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "/product/6752004906ce1e0a1e997604",
  },
  {
    name: "Contemporary Chic Diamond Mangalsutra",
    description: "₹ 45,500",
    imageSrc: hm_ts_3,
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "/product/675177e7333d2b680bd11de3",
  },
];

const TopSeller = () => {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-16">
          <h2 className="text-2xl font-bold text-gray-900">Top Seller</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <img
                  alt={callout.imageAlt}
                  src={callout.imageSrc}
                  className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                />
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSeller;
