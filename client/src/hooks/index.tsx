import { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartActionType } from "../shopping-cart-state/action-types";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../shopping-cart-state/store";

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useShoppingCartDispatch: () => Dispatch<ShoppingCartActionType> =
  useDispatch;

export function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  cb: () => void
) {
  useEffect(() => {
    const outsideClick = (e: React.MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      cb();
    };
    document.addEventListener("mousedown", outsideClick as () => void);
    document.addEventListener("touchstart", outsideClick as () => void);

    return () => {
      document.removeEventListener("mousedown", outsideClick as () => void);
      document.removeEventListener("touchstart", outsideClick as () => void);
    };
  });
}

type ReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): ReturnType<T> => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) return JSON.parse(storedValue);
    if (typeof initialValue === "function") {
      return initialValue as React.Dispatch<React.SetStateAction<T>>;
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
};
