import { useState } from "react";
import { Link } from "react-router-dom";
import { ERoutes } from "../../types";
import headerLogo from "@/assets/svgs/header-logo.svg";
import { accordionItems } from "./data";
import Accordion from "./Accordion";

export default function FAQ() {
  const [click, setClick] = useState<number>(0);

  function toggleAccordion(idx: number) {
    if (click === idx) {
      return setClick(0);
    }
    return setClick(idx);
  }

  return (
    <>
      <div className="nav__logo-page">
        <Link to={ERoutes.home}>
          <p>GanjaWebshop</p>
        </Link>
        <img src={headerLogo} alt="header logo svg icon" />
      </div>
      <section className="faq container">
        <h2 className="section__title">
          <span>frequently asked questions</span>
        </h2>
        <div className="faq__container">
          <ul className="faq__container-wrapper">
            {accordionItems.map((item, idx) => {
              return (
                <Accordion
                  key={item.id}
                  item={item}
                  toggleAccordion={toggleAccordion}
                  click={click}
                  idx={idx}
                />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
