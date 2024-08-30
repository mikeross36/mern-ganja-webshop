import { FaChevronDown } from "react-icons/fa";
import { ItemType } from "./data";

type PropsType = {
  item: ItemType;
  toggleAccordion: (idx: number) => void;
  click: number;
  idx: number;
};

export default function Accordion({
  item,
  toggleAccordion,
  click,
  idx,
}: PropsType) {
  return (
    <li className="accordion">
      <div className="question" onClick={() => toggleAccordion(idx)}>
        <div className="left">
          <h4>{item.title}</h4>
        </div>
        <div className="right">
          <FaChevronDown size={20} className={click === idx ? "active" : ""} />
        </div>
      </div>
      <div className={click === idx ? "answer active" : "answer"}>
        <p>{item.content}</p>
      </div>
    </li>
  );
}
