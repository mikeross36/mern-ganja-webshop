import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ERoutes, IUserResponse } from "../types";
import { FaEye } from "react-icons/fa";
import headerLogo from "@/assets/svgs/header-logo.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { SET_USER } from "../contexts/AuthContextProvider";
import { useAuthContext, useAppContext } from "../hooks";
import { useRegisterUser, useLoginUser } from "../features/auth";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUserInfo } from "../api/auth";

export default function AuthPage() {
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const [attributeType, setAttributeType] = useState<"password" | "text">(
    "password"
  );
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const authContext = useAuthContext();
  const { setShowModalForgot } = useAppContext();

  function handleAuthType() {
    setAuthType((prev) => (prev === "login" ? "register" : "login"));
  }

  function toggleAttributeType() {
    setAttributeType((prev) => (prev === "password" ? "text" : "password"));
  }

  const { mutate: register, isPending: isRegisterPending } = useRegisterUser();
  const { mutate: login, isPending: isLoginPending } = useLoginUser();

  const memoizedSelect = useCallback(
    (data: IUserResponse) => data.data.user,
    []
  );
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getLoggedInUserInfo,
    enabled: false,
    select: memoizedSelect,
    retry: 1,
  });

  const dispatch = authContext?.dispatch;

  useEffect(() => {
    if (query.isSuccess && dispatch) {
      dispatch({ type: SET_USER, payload: query.data });
    }
  }, [dispatch, query.data, query.isSuccess]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (authType === "register") {
      register(
        { userName, email, password, confirmPassword },
        {
          onSettled: () => {
            setUserName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          },
        }
      );
    } else {
      login(
        { email, password },
        {
          onSuccess: async () => await query.refetch(),
          onSettled: () => {
            setEmail("");
            setPassword("");
          },
        }
      );
    }
  }

  const isPending = isRegisterPending || isLoginPending;

  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      <section className="auth__page">
        <div className="nav__logo">
          <Link to={ERoutes.home}>
            <p>GanjaWebshop</p>
          </Link>
          <img src={headerLogo} alt="header logo svg icon" />
        </div>
        <h2 className="section__title">
          <span>{authType === "login" ? "login" : "register"}</span>
        </h2>
        <div className="auth__page-container container">
          <div className="auth__page-content">
            <form className="auth__form" onSubmit={handleFormSubmit}>
              {authType === "register" && (
                <>
                  <div className="login">
                    <span>Already have an account?</span>
                    <Link to="#" onClick={handleAuthType}>
                      login
                    </Link>
                  </div>
                  <div className="form__field">
                    <Input
                      type="text"
                      name="userName"
                      autoComplete="off"
                      placeHolder="user name"
                      value={userName}
                      onChange={setUserName}
                      required
                      disabled={isPending}
                    />
                  </div>
                </>
              )}
              <div className="form__field">
                <Input
                  type="email"
                  name="email"
                  autoComplete="off"
                  placeHolder="email"
                  value={email}
                  onChange={setEmail}
                  required
                  disabled={isPending}
                />
              </div>
              <div className="form__field">
                {attributeType === "password" ? (
                  <Input
                    type="password"
                    name="password"
                    autoComplete="off"
                    minLength={8}
                    maxLength={24}
                    placeHolder="password"
                    value={password}
                    onChange={setPassword}
                    required
                    disabled={isPending}
                  />
                ) : (
                  <Input
                    type="text"
                    name="password"
                    autoComplete="off"
                    minLength={8}
                    maxLength={24}
                    placeHolder="password"
                    value={password}
                    onChange={setPassword}
                    required
                    disabled={isPending}
                  />
                )}
                <span className="eye" onClick={toggleAttributeType}>
                  <FaEye />
                </span>
              </div>
              {authType === "register" && (
                <div className="form__field">
                  {attributeType === "password" ? (
                    <Input
                      type="password"
                      name="confirmPassword"
                      autoComplete="off"
                      placeHolder="confirm password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      required
                      disabled={isPending}
                    />
                  ) : (
                    <Input
                      type="text"
                      name="confirmPassword"
                      autoComplete="off"
                      placeHolder="confirm password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      required
                      disabled={isPending}
                    />
                  )}
                  <span className="eye" onClick={toggleAttributeType}>
                    <FaEye />
                  </span>
                </div>
              )}
              <Button type="submit" className="auth__button button button--mid">
                {authType === "login" ? "login" : "register"}
              </Button>
              {authType === "login" && (
                <>
                  <div className="sign__up">
                    <span>Don't have an account?</span>
                    <Link to="#" onClick={handleAuthType}>
                      sign up
                    </Link>
                  </div>
                  <div className="forgot__pass">
                    <Link to="#" onClick={() => setShowModalForgot(true)}>
                      <span>forgot password</span>
                    </Link>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
