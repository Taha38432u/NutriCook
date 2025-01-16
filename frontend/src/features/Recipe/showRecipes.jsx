import { useState } from "react";
import FilterSection from "../../ui/FilterSection.jsx";
import useGetAllRecipes from "./getAllRecipes.js";
import RecipeItem from "./RecipeItem.jsx"; // Import the RecipeItem component

function ShowRecipes() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    caloriesMin: "",
    caloriesMax: "",
    proteinMin: "",
    proteinMax: "",
    fatMin: "",
    fatMax: "",
    carbsMin: "",
    carbsMax: "",
    cookingTimeMin: "",
    cookingTimeMax: "",
    preparationTimeMin: "",
    preparationTimeMax: "",
    ingredients: "",
    cuisineType: "",
    sortBy: "",
  });

  const { isLoading, allRecipes } = useGetAllRecipes(filters); // Fetch recipes with filters

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Update filters state when filter is applied
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible); // Toggle visibility of the filter section
  };

  return (
    // <h1>Test</h1>
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <button
          onClick={toggleFilterVisibility}
          className="text-blue-500 hover:text-blue-700"
        >
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Render FilterSection if visible */}
      {isFilterVisible && <FilterSection onFilterChange={handleFilterChange} />}

      {/* Recipes List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p>Loading recipes...</p>
        ) : (
          allRecipes.data.recipes.map((recipe) => (
            <RecipeItem key={recipe.id} data={recipe} /> // Render RecipeItem for each recipe
          ))
        )}
      </div>
    </div>
  );
}

export default ShowRecipes;
