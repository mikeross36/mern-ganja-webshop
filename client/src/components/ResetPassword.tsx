import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useResetPassword, useLogoutUser } from "../features/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import headerLogo from "@/assets/svgs/header-logo.svg";
import Input from "./Input";
import Loader from "./Loader";
import Button from "./Button";

export default function ResetPassword() {
  const [attributeType, setAttributeType] = useState<"password" | "text">(
    "password"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetToken } = useParams();
  const { mutate: resetPasswordAction, isPending } = useResetPassword();
  const { mutate: logoutAction } = useLogoutUser();

  function toggleAttributeType() {
    setAttributeType((prev) => (prev === "password" ? "text" : "password"));
  }

  function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!resetToken) {
      toast.error("Invalid or expired reset token");
      return;
    }
    resetPasswordAction({ resetToken, password, confirmPassword });
    setPassword("");
    setConfirmPassword("");
    const timer = setTimeout(() => {
      logoutAction();
      localStorage.clear();
      window.location.reload();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <section className="reset__password ">
      <div className="reset__form-bcg">
        <form className="reset__form" onSubmit={handleResetPassword}>
          <div className="reset__title">
            <img src={headerLogo} alt="header logo svg icon" width="32" />
            <h3>reset password</h3>
          </div>
          <div className="form__control">
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
              />
            )}
            <span className="eye" onClick={toggleAttributeType}>
              <FaEye />
            </span>
          </div>
          <div className="form__control">
            {attributeType === "password" ? (
              <Input
                type="password"
                name="confirmPassword"
                autoComplete="off"
                placeHolder="confirm password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            ) : (
              <Input
                type="text"
                name="confirmPassword"
                autoComplete="off"
                placeHolder="confirm password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            )}
            <span className="eye" onClick={toggleAttributeType}>
              <FaEye />
            </span>
          </div>
          <Button type="submit" className="button button--mid">
            reset
          </Button>
        </form>
      </div>
    </section>
  );
}
