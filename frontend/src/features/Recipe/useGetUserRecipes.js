import { useQuery } from "@tanstack/react-query";
import { getMyRecipes } from "../../services/apiRecipe.js";

export default function useGetUserRecipes(filters) {
  const { isLoading, data: myRecipes } = useQuery({
    queryKey: ["myRecipes", filters],
    queryFn: () => getMyRecipes(filters),
  });

  return {
    isLoading,
    myRecipes,
  };
}
