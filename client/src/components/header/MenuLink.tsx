import AnchroLink from "react-anchor-link-smooth-scroll";
import { ESelectedPage } from "../../types";
import { useAppContext } from "../../hooks";

export default function MenuLink({ page }: { page: string }) {
  const { selectedPage, setSelectedPage } = useAppContext();

  return (
    <AnchroLink
      onClick={() => setSelectedPage(page as ESelectedPage)}
      className={`nav__link ${selectedPage === page && "active"}`}
      href={`#${page}`}
    >
      {page}
    </AnchroLink>
  );
}
