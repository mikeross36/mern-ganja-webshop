import bcgImage from "@/assets/categories/type-3.jpg";
import { MissionItemType } from "./data";

export default function AboutUsItem({ item }: { item: MissionItemType }) {
  return (
    <li className="about__item">
      <h4>{item.title}</h4>
      <div className="item__description">
        <p>{item.text}</p>
      </div>
      <div className="circle">
        <img src={bcgImage} alt="" />
      </div>
    </li>
  );
}
