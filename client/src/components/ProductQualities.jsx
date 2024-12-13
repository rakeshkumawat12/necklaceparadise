import hm_pq_1 from "../assets/hm_pq_1.jpg";
import hm_pq_2 from "../assets/hm_pq_2.jpg";
import hm_pq_3 from "../assets/hm_pq_3.jpg";
import hm_pq_4 from "../assets/hm_pq_4.jpg";

const features = [
  {
    name: "Exquisite Craftsmanship",
    description:
      "Handcrafted designs with meticulous attention to detail for a timeless appeal.",
  },
  {
    name: "Premium Materials",
    description:
      "High-quality gold, silver, and gemstones ensuring durability and elegance.",
  },
  {
    name: "Unique Designs",
    description:
      "Exclusive, modern, and traditional styles to suit every occasion.",
  },
  {
    name: "Hypoallergenic Options",
    description:
      "Skin-friendly materials for sensitive skin without compromising style.",
  },
  {
    name: "Customizable Jewelry",
    description: "Personalized options for engravings and bespoke designs.",
  },
  {
    name: "Authenticity Guaranteed",
    description:
      "Certified gemstones and precious metals with authenticity certifications.",
  },
];

const ProductQualities = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Timeless Qualities
          </h2>
          <p className="mt-4 text-gray-500">
            Discover timeless elegance with our handcrafted jewelry, featuring
            premium materials, unique designs, and customizable options, perfect
            for every occasion. Authenticity and quality guaranteed for your
            peace of mind.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="IMG1"
            src={hm_pq_1}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="IMG2"
            src={hm_pq_2}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="IMG3"
            src={hm_pq_3}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="IMG4"
            src={hm_pq_4}
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductQualities;
