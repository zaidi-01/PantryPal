using server.Enums;
namespace server.DTOs
{
  /// <summary>
  /// A new recipe.
  /// </summary>
  public class RecipeCreateOrUpdateDTO
  {
    /// <summary>
    /// The name of the recipe.
    /// </summary>
    public required string Name { get; set; }

    /// <summary>
    /// The description of the recipe.
    /// </summary>
    public required string Description { get; set; }

    /// <summary>
    /// The ingredients of the recipe.
    /// </summary>
    public required string Ingredients { get; set; }

    /// <summary>
    /// The directions of the recipe.
    /// </summary>
    public required string Directions { get; set; }

    /// <summary>
    /// The cook time of the recipe.
    /// </summary>
    public string? CookTime { get; set; }

    /// <summary>
    /// The prep time of the recipe.
    /// </summary>
    public string? PrepTime { get; set; }

    /// <summary>
    /// The total time of the recipe.
    /// </summary>
    public string? TotalTime { get; set; }

    /// <summary>
    /// The yield of the recipe.
    /// </summary>
    public string? Yield { get; set; }

    /// <summary>
    /// The servings of the recipe.
    /// </summary>
    public string? Servings { get; set; }

    /// <summary>
    /// The calories of the recipe.
    /// </summary>
    public int? Calories { get; set; }

    /// <summary>
    /// A list of <see cref="RecipeCategory"/>s for the recipe.
    /// </summary>
    public required IEnumerable<RecipeCategory> Categories { get; set; }

    /// <summary>
    /// A list of <see cref="DietaryRestriction"/>s for the recipe.
    /// </summary>
    public required IEnumerable<DietaryRestriction> DietaryRestrictions { get; set; }
}
}
