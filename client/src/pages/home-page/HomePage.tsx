import { motion } from "framer-motion";
import { useAppContext } from "../../hooks";
import { ERoutes, ESelectedPage, HomeCardType } from "../../types";
import { Link } from "react-router-dom";
import { homeCards } from "./data";
import Button from "../../components/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const contentVariants = {
  hidden: { x: "-100vw" },
  visible: { x: 0, transition: { type: "spring", stiffness: 120 } },
};

const cardVariants = {
  hidden: { x: "100vw" },
  visible: { x: 0, transition: { type: "spring", stiffness: 120 } },
};

export default function HomePage() {
  const { setSelectedPage } = useAppContext();

  return (
    <motion.section
      className="home"
      id="home"
      onViewportEnter={() => setSelectedPage(ESelectedPage.home)}
    >
      <div className="home__wrapper">
        <main className="home__container container">
          <motion.div
            className="home__content item--1"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="home__title">
              <span>
                Ganja <br />
                Webshop
              </span>
            </h1>
            <h3 className="home__content-text">
              <span>
                Welcome to GanjaWebshop a judgement free dispensary with high
                quality brands
              </span>
            </h3>
            <div className="home__btns">
              <a
                href="https://www.drugs.com/illicit/cannabis.html"
                target="_blank"
                rel="noreferrer"
                role="button"
              >
                <Button type="button" className="button">
                  explore
                </Button>
              </a>
              <Link to={ERoutes.faq}>
                <Button type="button" className="button button--mid">
                  FAQ
                </Button>
              </Link>
            </div>
          </motion.div>
          {homeCards.map((card: HomeCardType) => {
            return (
              <motion.div
                key={card.id}
                className={card.className}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <LazyLoadImage
                  width={"100%"}
                  height={"100%"}
                  effect="blur"
                  src={card.image}
                  alt="home card photo"
                  className="home__card-img"
                />
                <div className="home__card-overlay">
                  <p>{card.title}</p>
                  <p>{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </main>
      </div>
    </motion.section>
  );
}
