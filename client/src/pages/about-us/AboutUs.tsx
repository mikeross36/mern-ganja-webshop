import { motion } from "framer-motion";
import { useAppContext } from "../../hooks";
import { ESelectedPage } from "../../types";
import { missionItems, aboutUsTeam } from "./data";
import happyPeople from "@/assets/happy-people.png";
import AboutUsItem from "./AboutUsItem";
import TeamItem from "./TeamItem";

export default function AboutUs() {
  const { setSelectedPage } = useAppContext();

  return (
    <section className="about__us container" id="about">
      <motion.div
        className="about__us-wrapper"
        onViewportEnter={() => setSelectedPage(ESelectedPage.aboutus)}
      >
        <h2 className="section__title">
          <span>our mission</span>
        </h2>
        <div className="about__us-items">
          <ul className="about__items-list">
            {missionItems.map((item) => {
              return <AboutUsItem key={item.id} item={item} />;
            })}
          </ul>
        </div>
      </motion.div>
      <div className="about__us-team">
        <h2 className="section__title">
          <span>our team</span>
        </h2>
        <ul className="team__items">
          {aboutUsTeam.map((item) => {
            return <TeamItem key={item.id} item={item} />;
          })}
        </ul>
      </div>
      <div className="about__us-users">
        <img src={happyPeople} alt="happy people image" className="users-img" />
        <div className="users__text">
          <h2>
            <span>Thousands of Happy Users</span>
          </h2>
          <p>
            We're proud to carry one of the largest selections of cannabis on
            the market—including premium flower, vapes, edibles, concentrates
            and medicinal products from the most trusted brands in the cannabis
            industry.
          </p>
          <p>
            Naturally, we carry products from the ever-growing family of brands
            including Cresco, High Supply, FloraCal, Mindy's, Good News, Wonder,
            and Remedi, and remain dedicated to bringing our customers the best
            products from the best cultivators.
          </p>
        </div>
      </div>
    </section>
  );
}
