import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ERoutes } from "../types";
import { verifyEmail } from "../api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function VerifyAccount() {
  const { userId, verificationCode } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function useVerifyEmail() {
    const { mutate } = useMutation({
      mutationFn: ({
        userId,
        verificationCode,
      }: {
        userId: string;
        verificationCode: string;
      }) => verifyEmail(userId, verificationCode),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        toast.success(data.message);
        navigate(`${ERoutes.authpage}`);
        // console.log(data);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
    return { mutate };
  }

  const { mutate: verifyEmailMutation } = useVerifyEmail();

  useEffect(() => {
    if (userId && verificationCode) {
      verifyEmailMutation({ userId, verificationCode });
    }
  }, [userId, verificationCode, verifyEmailMutation]);

  return <></>;
}
