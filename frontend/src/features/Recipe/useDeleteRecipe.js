import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe as deleteRecipeApi } from "../../services/apiRecipe.js";

function useDeleteRecipe() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteRecipe } = useMutation({
    mutationFn: deleteRecipeApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["allRecipes"]);
      queryClient.invalidateQueries(["singleRecipe"]);
      queryClient.invalidateQueries(["allRecipesAdmin"]);
    },
  });
  return {
    isDeleting,
    deleteRecipe,
  };
}

export default useDeleteRecipe;
