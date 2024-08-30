import { motion } from "framer-motion";
import { GanjaPageImageType } from "../../types";

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2, duration: 0.5 },
  },
};

export default function GanjasPageElementImage({
  item,
}: {
  item: GanjaPageImageType;
}) {
  return (
    <motion.li
      variants={itemVariants}
      viewport={{ once: true, amount: 0.5 }}
      initial="hidden"
      animate="visible"
    >
      <img src={item.src} alt={item.alt} className={item.className} />
    </motion.li>
  );
}
