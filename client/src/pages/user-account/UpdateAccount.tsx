import { useState } from "react";
import { useAuthContext } from "../../hooks";
import { useUpdateUserAccount } from "../../features/users";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

export default function UpdateAccount() {
  const authContext = useAuthContext();
  const loggedInUser = authContext?.state.authUser;

  const [userName, setUserName] = useState(
    loggedInUser ? loggedInUser.userName : ""
  );
  const [email, setEmail] = useState(loggedInUser ? loggedInUser.email : "");

  const { mutate: updateAccountAction, isPending } = useUpdateUserAccount();

  function handleUpdateAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateAccountAction({ userName, email }),
      {
        onSettled: () => {
          setUserName("");
          setEmail("");
        },
      };
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="user__account-form-container">
      <form className="form__user-data" onSubmit={handleUpdateAccount}>
        <h3 className="form__title">data update</h3>
        <div className="form__control">
          <Input
            type="text"
            name="name"
            value={userName}
            onChange={setUserName}
            autoComplete="fale"
            required
          />
        </div>
        <div className="form__control">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={setEmail}
            autoComplete="fale"
            required
          />
        </div>
        <span>
          <Button type="submit" className="button button--mid">
            update
          </Button>
        </span>
      </form>
    </div>
  );
}
