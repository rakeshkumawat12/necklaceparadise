import CustomerReviews from "../components/CustomerReviews";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import PopularCategory from "../components/PopularCategory";
import ProductQualities from "../components/ProductQualities";
import Promotional from "../components/Promotional";
import ShopByCategory from "../components/ShopByCategory";
import TopSeller from "../components/TopSeller";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <PopularCategory />
      <ShopByCategory />
      <TopSeller />
      <ProductQualities />
      <Promotional/>
      <CustomerReviews />
      <Footer />
    </>
  );
};

export default Home;
