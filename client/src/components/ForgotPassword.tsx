import { useState } from "react";
import { useForgotPassword } from "../features/auth";
import headerLogo from "@/assets/svgs/header-logo.svg";
import Input from "./Input";
import Button from "./Button";
import Loader from "./Loader";

export default function ForgotPasword() {
  const [email, setEmail] = useState("");
  const { mutate: forgotPass, isPending } = useForgotPassword();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    forgotPass({ email }),
      {
        onSuccess: () => {
          setEmail("");
        },
      };
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="forgot__form-container">
      <form className="forgot__form" onSubmit={handleFormSubmit}>
        <div className="forgot__title">
          <img src={headerLogo} alt="header logo svg icon" width={32} />
          <h3>enter your email</h3>
        </div>
        <div className="input__control">
          <Input
            type="email"
            name="email"
            placeHolder="your email..."
            required
            value={email}
            onChange={setEmail}
          />
        </div>
        <Button type="submit" className="button button--mid">
          send
        </Button>
      </form>
    </div>
  );
}
