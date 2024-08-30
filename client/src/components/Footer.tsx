import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer ">
      <div className="footer__container container">
        <div className="footer__content">
          <h5 className="footer__title">our information</h5>
          <ul className="footer__list">
            <li>GanjaWebshop</li>
            <li>1234 europe </li>
            <li>some street 42310</li>
          </ul>
        </div>
        <div className="footer__content">
          <h5 className="footer__title">ganja blogs</h5>
          <ul className="footer__links">
            <li>
              <a
                href="https://thcdesign.com/blog/"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                THC Design
              </a>
            </li>
            <li>
              <a
                href="https://mongolife.com/blogs/news"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                mongolife
              </a>
            </li>
            <li>
              <a
                href="https://www.royalqueenseeds.com/blog-lifestyle-c12"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                cannabis lifestyle
              </a>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="footer__content">
          <h5 className="footer__title">trending</h5>
          <ul className="footer__links">
            <li>
              <a
                href="https://flowhub.com/cannabis-industry-statistics"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                marijuana industry statistics
              </a>
            </li>
            <li>
              <a
                href="https://www.kiplinger.com/investing/stocks/cannabis-trends-to-watch"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                cannabis trends to watch
              </a>
            </li>
            <li>
              <a
                href="https://thecannabisindustry.org/unveiling-the-future-navigating-the-cannabis-landscape-in-2024/"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                cannabis industry predictions
              </a>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="footer__content">
          <h5 className="footer__title">social media</h5>
          <ul className="footer__social">
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
              >
                <FaFacebook className="social__icon" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
              >
                <FaTwitter className="social__icon" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
              >
                <FaInstagram className="social__icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <a
        href="https://www.vladimir-monarov.com/"
        target="_blanka"
        rel="noreferre"
      >
        <span className="footer__copy">&copy; Copyright 2024 DodaDesign</span>
      </a>
    </footer>
  );
}
