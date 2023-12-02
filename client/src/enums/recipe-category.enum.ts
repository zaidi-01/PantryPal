/**
 * Represents the category of a recipe.
 */
export enum RecipeCategory {
  /**
   * Appetizer.
   */
  Appetizer,

  /**
   * Main course.
   */
  MainCourse,

  /**
   * Dessert.
   */
  Dessert,

  /**
   * Beverage.
   */
  Beverage,

  /**
   * Salad.
   */
  Salad,

  /**
   * Soup.
   */
  Soup,

  /**
   * Side dish.
   */
  SideDish,

  /**
   * Snack.
   */
  Breakfast,

  /**
   * Brunch.
   */
  Brunch,

  /**
   * Lunch.
   */
  Lunch,

  /**
   * Dinner.
   */
  Dinner,

  /**
   * Snack.
   */
  Snack,
}

/**
 * Display names for recipe categories.
 * @example
 * ```ts
 * RecipeCategoryDisplayNames[RecipeCategory.MainCourse] === 'Main Course'
 * ```
 */
export const RecipeCategoryDisplayNames: Record<RecipeCategory, string> = {
  [RecipeCategory.Appetizer]: 'Appetizer',
  [RecipeCategory.MainCourse]: 'Main Course',
  [RecipeCategory.Dessert]: 'Dessert',
  [RecipeCategory.Beverage]: 'Beverage',
  [RecipeCategory.Salad]: 'Salad',
  [RecipeCategory.Soup]: 'Soup',
  [RecipeCategory.SideDish]: 'Side Dish',
  [RecipeCategory.Breakfast]: 'Breakfast',
  [RecipeCategory.Brunch]: 'Brunch',
  [RecipeCategory.Lunch]: 'Lunch',
  [RecipeCategory.Dinner]: 'Dinner',
  [RecipeCategory.Snack]: 'Snack',
};
