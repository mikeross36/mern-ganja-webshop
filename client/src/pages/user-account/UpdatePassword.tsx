import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useUpdatePassword, useLogoutUser } from "../../features/auth";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

export default function UpdatePassword() {
  const [attributeType, setAttributeType] = useState<"password" | "text">(
    "password"
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function toggleAttributeType() {
    setAttributeType((prev) => (prev === "password" ? "text" : "password"));
  }

  const { mutate: updatePasswordActon, isPending } = useUpdatePassword();
  const { mutate: logoutAction } = useLogoutUser();

  function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Please enter current password");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    updatePasswordActon({ currentPassword, password, confirmPassword });
    setCurrentPassword("");
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
    <div className="user__account-form-container">
      <form className="form__user-password" onSubmit={handleUpdatePassword}>
        <h3 className="form__title">password update</h3>
        <div className="form__control">
          {attributeType === "password" ? (
            <Input
              type="password"
              name="currentPassword"
              autoComplete="off"
              minLength={8}
              maxLength={24}
              placeHolder="current password"
              required
              value={currentPassword}
              onChange={setCurrentPassword}
            />
          ) : (
            <Input
              type="text"
              name="currentPassword"
              autoComplete="off"
              minLength={8}
              maxLength={24}
              placeHolder="current password"
              required
              value={currentPassword}
              onChange={setCurrentPassword}
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
              name="password"
              autoComplete="off"
              minLength={8}
              maxLength={24}
              placeHolder="password"
              required
              value={password}
              onChange={setPassword}
            />
          ) : (
            <Input
              type="text"
              name="password"
              autoComplete="off"
              minLength={8}
              maxLength={24}
              placeHolder="password"
              required
              value={password}
              onChange={setPassword}
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
              name="confirm-password"
              autoComplete="off"
              minLength={8}
              maxLength={24}
              placeHolder="confirm password"
              required
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          ) : (
            <Input
              type="text"
              name="confirm-password"
              autoComplete="off"
              minLength={8}
              maxLength={24}
              placeHolder="confirm password"
              required
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          )}
          <span className="eye" onClick={toggleAttributeType}>
            <FaEye />
          </span>
        </div>
        <Button type="submit" className="button button--mid">
          update
        </Button>
      </form>
    </div>
  );
}
