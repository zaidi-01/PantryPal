import { DietaryRestriction, RecipeCategory } from "@enums";

/**
 * Represents a recipe.
 */
export interface Recipe {
  /** The ID of the recipe. */
  id: number;
  /** The name of the recipe. */
  name: string;
  /** The description of the recipe. */
  description: string;
  /** The ingredients of the recipe. */
  ingredients: string;
  /** The directions of the recipe. */
  directions: string;
  /** The date the recipe was created. */
  dateCreated: Date;
  /** The date the recipe was last updated. */
  dateUpdated: Date;
  /** The image IDs of the recipe. */
  imageIds: number[];
  /** The image URLs of the recipe. */
  imageUrls: string[];
  /** The cook time of the recipe. */
  cookTime?: string;
  /** The prep time of the recipe. */
  prepTime?: string;
  /** The total time of the recipe. */
  totalTime?: string;
  /** The yield of the recipe. */
  yield?: string;
  /** The number of servings of the recipe. */
  servings?: string;
  /** The calories of the recipe. */
  calories?: number;
  /** The categories of the recipe. */
  categories: RecipeCategory[];
  /** The dietary restrictions of the recipe. */
  dietaryRestrictions: DietaryRestriction[];
}
