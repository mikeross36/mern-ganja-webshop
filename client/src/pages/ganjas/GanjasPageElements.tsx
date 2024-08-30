import { motion } from "framer-motion";
import { ganjaPageImages } from "./data";
import GanjasPageElementImage from "./GanjasPageElementImage";

export default function GanjasPageElements() {
  return (
    <section className="elements">
      <motion.div className="elements__container">
        <ul className="elements__img-background container">
          {ganjaPageImages.map((item) => {
            return <GanjasPageElementImage key={item.id} item={item} />;
          })}
        </ul>
      </motion.div>
    </section>
  );
}
