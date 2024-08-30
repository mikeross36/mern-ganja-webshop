import { createContext, useState, useMemo } from "react";
import { ESelectedPage } from "../types";

type AppContextType = {
  selectedPage: ESelectedPage;
  setSelectedPage: React.Dispatch<React.SetStateAction<ESelectedPage>>;
  showMobMenu: boolean;
  setShowMobMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showModalForgot: boolean;
  setShowModalForgot: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext({} as AppContextType);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPage, setSelectedPage] = useState<ESelectedPage>(
    ESelectedPage.home
  );
  const [showMobMenu, setShowMobMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showModalForgot, setShowModalForgot] = useState(false);

  const value = useMemo(() => {
    return {
      selectedPage,
      setSelectedPage,
      showMobMenu,
      setShowMobMenu,
      isCartOpen,
      setIsCartOpen,
      showModalForgot,
      setShowModalForgot,
    };
  }, [
    selectedPage,
    setSelectedPage,
    showMobMenu,
    setShowMobMenu,
    isCartOpen,
    setIsCartOpen,
    showModalForgot,
    setShowModalForgot,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
