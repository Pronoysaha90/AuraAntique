import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Heritage from "@/components/Heritage";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";

const Index = () => {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Categories />
          <FeaturedProducts />
          <Heritage />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
        <Cart />
        <Checkout />
      </div>
    </StoreProvider>
  );
};

export default Index;
