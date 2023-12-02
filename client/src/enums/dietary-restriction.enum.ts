/**
 * Represents the dietary restriction of a recipe.
 */
export enum DietaryRestriction {
  /**
   * Vegan.
   */
  Vegan,

  /**
   * Vegetarian.
   */
  Vegetarian,

  /**
   * Pescatarian.
   */
  Pescatarian,

  /**
   * Gluten-free.
   */
  GlutenFree,

  /**
   * Dairy-free.
   */
  DairyFree,

  /**
   * Nut-free.
   */
  NutFree,

  /**
   * Kosher.
   */
  Kosher,

  /**
   * Halal.
   */
  Halal,
}

/**
 * The display names of each dietary restriction.
 * @example
 * ```ts
 * DietaryRestrictionDisplayNames[DietaryRestriction.Vegan] === 'Vegan'
 * ```
 */
export const DietaryRestrictionDisplayNames: Record<DietaryRestriction, string> = {
  [DietaryRestriction.Vegan]: 'Vegan',
  [DietaryRestriction.Vegetarian]: 'Vegetarian',
  [DietaryRestriction.Pescatarian]: 'Pescatarian',
  [DietaryRestriction.GlutenFree]: 'Gluten-free',
  [DietaryRestriction.DairyFree]: 'Dairy-free',
  [DietaryRestriction.NutFree]: 'Nut-free',
  [DietaryRestriction.Kosher]: 'Kosher',
  [DietaryRestriction.Halal]: 'Halal',
};
