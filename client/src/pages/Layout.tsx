import { Suspense, lazy } from "react";
import Header from "../components/header/Header";
import RunningText from "../components/RunningText";
import GanjasPage from "./ganjas/GanjasPage";
import Categories from "./Categories";
import ShoppingCart from "../components/shopping-cart/ShoppingCart";
import Footer from "../components/Footer";
const HomePage = lazy(() => import("./home-page/HomePage"));
const AboutUs = lazy(() => import("./about-us/AboutUs"));
const Contact = lazy(() => import("./Contact"));

export default function Layout() {
  return (
    <Suspense>
      <ShoppingCart />
      <Header />
      <HomePage />
      <RunningText />
      <AboutUs />
      <GanjasPage />
      <Categories />
      <Contact />
      <Footer />
    </Suspense>
  );
}
