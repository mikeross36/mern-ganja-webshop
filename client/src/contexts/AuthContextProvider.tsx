import { createContext, useMemo, useReducer } from "react";
import { IUser } from "../types";
// import { useLocalStorage } from "../hooks";

type StateType = {
  authUser: IUser | null;
};
type ActionType = {
  type: string;
  payload: IUser | null;
};

export type DispatchType = (action: ActionType) => void;

const initialState: StateType = {
  authUser: null,
};

export const AuthContext = createContext<
  { state: StateType; dispatch: DispatchType } | undefined
>(undefined);

export const SET_USER = "SET_USER";

const authReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    default: {
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
};

// const usePersistedReducer = () => {
//   const [savedState, setSavedState] = useLocalStorage<StateType>(
//     "authUser",
//     initialState
//   );
//   const reducerLocalStorage = useCallback(
//     (state: StateType, action: ActionType): StateType => {
//       const newState = authReducer(state, action);
//       setSavedState(newState);
//       return newState;
//     },
//     [setSavedState]
//   );
//   return useReducer(reducerLocalStorage, savedState);
// };

type AuthContextProviderProps = { children: React.ReactNode };

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // console.log(state);
  const value = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state, dispatch]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
