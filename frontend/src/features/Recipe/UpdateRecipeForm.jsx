import { useState } from "react";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx"; // Assuming FormRow is your custom form component
import Button from "../../ui/Button.jsx";
import useCreateRecipe from "./useCreateRecipe.js";
import { useLocation, useParams } from "react-router-dom";

function UpdateRecipeForm() {
  const { id } = useParams();
  const { state } = useLocation();

  const [firstTime, setFirstTime] = useState(true);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      title: state.data.title,
      description: state.data.description,
      instructions: state.data.instructions,
      preparationTime: state.data.preparationTime,
      cookingTime: state.data.cookingTime,
      cuisine: state.data.cuisine,
      dietaryPreferences: state.data.dietaryPreferences,
    },
  });

  const { errors } = formState;

  const [ingredients, setIngredients] = useState([{ ingName: "" }]);

  if (firstTime) {
    setFirstTime(false);
    setIngredients(state.data.ingredients);
  }

  const { isAdding, createRecipe } = useCreateRecipe();

  // Function to handle ingredient input changes
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = ingredients.map((ingredient, idx) =>
      idx === index ? { ...ingredient, ingName: value } : ingredient,
    );
    setIngredients(updatedIngredients);
  };

  // Function to add a new ingredient input field
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingName: "" }]);
  };

  // Function to remove an ingredient input field
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, idx) => idx !== index);
    setIngredients(updatedIngredients);
  };

  function onSubmit(data) {
    // Combine the ingredients into the final data object
    const recipeData = {
      ...data,
      ingredients,
    };

    createRecipe({ recipeData, id });

    console.log("Submitted Recipe Data:", recipeData);
    // Here you can send the data to your backend API using axios
    // Example: axios.post('/your-api-endpoint', recipeData);
  }

  function onError(error) {
    console.error("Form submission error:", error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-12">
      <div className="w-full max-w-3xl rounded-lg bg-gray-800 p-8 shadow-lg">
        <p className="mb-8 text-center text-lg font-semibold text-gray-100">
          Create A Recipe
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Recipe Title */}
          <FormRow label="Recipe Title" error={errors?.title?.message}>
            <input
              className="input"
              placeholder="Enter recipe title"
              type="text"
              id="title"
              {...register("title", { required: "Recipe title is required" })}
            />
          </FormRow>

          {/* Recipe Description */}
          <FormRow label="Description" error={errors?.description?.message}>
            <textarea
              className="input"
              placeholder="Enter recipe description"
              rows="4"
              id="description"
              {...register("description", {
                required: "Recipe description is required",
              })}
            />
          </FormRow>

          {/* Ingredients Section */}
          <FormRow label="Ingredients">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="mb-4 flex items-center">
                <input
                  className="input flex-1"
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient.ingName}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                />
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-blue-500"
              onClick={handleAddIngredient}
            >
              Add another ingredient
            </button>
          </FormRow>

          {/* Recipe Instructions */}
          <FormRow label="Instructions" error={errors?.instructions?.message}>
            <textarea
              className="input"
              placeholder="Enter cooking instructions"
              rows="6"
              id="instructions"
              {...register("instructions", {
                required: "Cooking instructions are required",
              })}
            />
          </FormRow>

          {/* Preparation Time */}
          <FormRow
            label="Preparation Time (minutes)"
            error={errors?.preparationTime?.message}
          >
            <input
              className="input"
              placeholder="Enter preparation time"
              type="number"
              id="preparationTime"
              {...register("preparationTime", {
                required: "Preparation time is required",
                valueAsNumber: true,
              })}
            />
          </FormRow>

          {/* Cooking Time */}
          <FormRow
            label="Cooking Time (minutes)"
            error={errors?.cookingTime?.message}
          >
            <input
              className="input"
              placeholder="Enter cooking time"
              type="number"
              id="cookingTime"
              {...register("cookingTime", {
                required: "Cooking time is required",
                valueAsNumber: true,
              })}
            />
          </FormRow>

          {/* Cuisine */}
          <FormRow label="Cuisine" error={errors?.cuisine?.message}>
            <input
              className="input"
              placeholder="Enter cuisine type"
              type="text"
              id="cuisine"
              {...register("cuisine", {
                required: "Cuisine is required",
              })}
            />
          </FormRow>

          {/* Dietary Preferences */}
          <FormRow
            label="Dietary Preferences"
            error={errors?.dietaryPreferences?.message}
          >
            <input
              className="input"
              placeholder="Enter dietary preferences (comma separated)"
              type="text"
              id="dietaryPreferences"
              {...register("dietaryPreferences", {
                required: "Dietary preferences are required",
              })}
            />
          </FormRow>

          {/* Submit Button */}
          <FormRow label="Submit">
            <Button content="Create Recipe" type="submit" disabled={isAdding} />
          </FormRow>
        </form>
      </div>
    </div>
  );
}

export default UpdateRecipeForm;
