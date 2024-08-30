import { motion } from "framer-motion";
import { AboutUsTeamType } from "./data";
import AboutSocials from "./AboutSocials";
import cannabisLogo from "@/assets/svgs/header-logo.svg";

export default function TeamItem({ item }: { item: AboutUsTeamType }) {
  return (
    <motion.li
      className="team__item"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <div className="team__item-inner">
        <div className="team__item-front">
          <div className="team__item-image">
            <div className="image__wrapper">
              <img
                src={item.photo}
                alt="team item photo"
                className="team__item-img"
              />
            </div>
          </div>

          <h4>{item.name}</h4>
          <img
            src={cannabisLogo}
            alt="cannabis logo svg icon"
            width="36"
            style={{ paddingBottom: "5px" }}
          />
          <p className="item__role">{item.role}</p>
          <p className="item__email">{item.email}</p>
        </div>
        <div className="team__item-back">
          <h4>{item.name}</h4>
          <img
            src={cannabisLogo}
            alt="cannabis logo svg icon"
            width="36"
            style={{ paddingBottom: "5px" }}
          />
          <p className="item__role">{item.role}</p>
          <p className="item__email">{item.email}</p>
          <AboutSocials />
        </div>
      </div>
    </motion.li>
  );
}
