import { updateUser as updateUserApi } from "../../services/apiAuth.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function UseUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("Details Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: [`user`],
      });
      queryClient.invalidateQueries({
        queryKey: [`allUsers`],
      });
    },
    onError: (error) => {
      // Check if the error message is about an existing email
      toast.error(error.message);
    },
  });

  return { isUpdating, updateUser };
}

export default UseUpdateUser;
