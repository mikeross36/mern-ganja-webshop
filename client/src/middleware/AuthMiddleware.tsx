import { useQuery } from "@tanstack/react-query";
import { SET_USER } from "../contexts/AuthContextProvider";
import { useAuthContext } from "../hooks";
import { getLoggedInUserInfo } from "../api/auth";
import { useCookies } from "react-cookie";
import { useCallback, useEffect } from "react";
import { IUserResponse } from "../types";
import Loader from "../components/Loader";

export default function AuthMiddleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = useAuthContext();
// name of cookie has nothig to do with the name of server's cookies
  const [cookies] = useCookies(["loggedin"]);

  const memoizedSelect = useCallback(
    (data: IUserResponse) => data.data.user,
    []
  );

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getLoggedInUserInfo,
    enabled: !!cookies.loggedin,
    select: memoizedSelect,
  });

  const dispatch = authContext?.dispatch;

  useEffect(() => {
    if (query.isSuccess && dispatch) {
      dispatch({ type: SET_USER, payload: query.data });
    }
  }, [query.data, query.isSuccess, dispatch]);

  if (query.isLoading) {
    return <Loader />;
  }

  return children;
}
