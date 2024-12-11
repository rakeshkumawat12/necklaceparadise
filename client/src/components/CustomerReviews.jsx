import { AnimatedTestimonials } from "../ui/AnimatedTestimonials";
import hm_cr_1 from "../assets/hm_cr_1.jpg";
import hm_cr_2 from "../assets/hm_cr_2.jpg";
import hm_cr_3 from "../assets/hm_cr_3.jpg";
import hm_cr_4 from "../assets/hm_cr_4.jpg";

const CustomerReviews = () => {
  const testimonials = [
    {
      quote:
        "I purchased a necklace from here for my sister’s wedding, and it was perfect. The craftsmanship and attention to detail are exceptional!",
      name: "Manjul Tiwari",
      designation: "Manjul Tiwari",
      src: hm_cr_2,
    },
    {
      quote:
        "The earrings I ordered were even more beautiful in person. Delivery was quick, and the packaging felt luxurious. Highly recommend!",
      name: "Harpal Singh",
      designation: "Harpal Singh",
      src: hm_cr_3,
    },
    {
      quote:
        "I had a bracelet customized, and it turned out exactly as I imagined. The team was so helpful throughout the process. Truly impressed!",
      name: "Rakesh Kumawat",
      designation: "Rakesh Kumawat",
      src: hm_cr_1,
    },
    {
      quote:
        "The ring I bought exceeded my expectations. It’s elegant and durable, and I get compliments every time I wear it. Will buy again!",
      name: "Aniket Sharma",
      designation: "Aniket Sharma",
      src: hm_cr_4,
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
};

export default CustomerReviews;
