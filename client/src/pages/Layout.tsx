import Header from "../components/header/Header";
import RunningText from "../components/RunningText";
import GanjasPage from "./ganjas/GanjasPage";
import Categories from "./Categories";
import ShoppingCart from "../components/shopping-cart/ShoppingCart";
import Footer from "../components/Footer";
import HomePage from "./home-page/HomePage";
import AboutUs from "./about-us/AboutUs";
import Contact from "./Contact";

export default function Layout() {
  return (
    <>
      <ShoppingCart />
      <Header />
      <HomePage />
      <RunningText />
      <AboutUs />
      <GanjasPage />
      <Categories />
      <Contact />
      <Footer />
    </>
  );
}
