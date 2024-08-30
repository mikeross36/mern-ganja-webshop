import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAccount } from "../../api/users";
import { toast } from "react-toastify";

export function useUpdateUserAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userName, email }: { userName: string; email: string }) => {
      return updateUserAccount(userName, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Account updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
