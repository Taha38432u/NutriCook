import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../../services/apiRecipe.js";

export default function useGetAllRecipes(filters) {
  const { isLoading, data: allRecipes } = useQuery({
    queryKey: ["allRecipes", filters],
    queryFn: () => getAllRecipes(filters), // Pass a function that will be called by React Query
  });

  return {
    isLoading,
    allRecipes,
  };
}
