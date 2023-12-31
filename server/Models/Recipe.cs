﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Enums;

namespace server.Models
{
  /// <summary>
  /// A recipe.
  /// </summary>
  public class Recipe
  {
    /// <summary>
    /// The recipe ID.
    /// </summary>
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    /// <summary>
    /// The name of the recipe.
    /// </summary>
    [Column(TypeName = "tinytext")]
    public required string Name { get; set; }

    /// <summary>
    /// The description of the recipe.
    /// </summary>
    [Column(TypeName = "text")]
    public required string Description { get; set; }

    /// <summary>
    /// The ingredients of the recipe.
    /// </summary>
    [Column(TypeName = "text")]
    public required string Ingredients { get; set; }

    /// <summary>
    /// The directions of the recipe.
    /// </summary>
    [Column(TypeName = "text")]
    public required string Directions { get; set; }

    /// <summary>
    /// The images of the recipe.
    /// </summary>
    public IEnumerable<RecipeImage>? Images { get; set; }

    /// <summary>
    /// The date the recipe was created.
    /// </summary>
    [Column(TypeName = "datetime(6)")]
    public required DateTime DateCreated { get; set; }

    /// <summary>
    /// The date the recipe was last updated.
    /// </summary>
    [Column(TypeName = "datetime(6)")]
    public required DateTime DateUpdated { get; set; }

    /// <summary>
    /// The cook time of the recipe.
    /// </summary>
    [Column(TypeName = "tinytext")]
    public string? CookTime { get; set; }

    /// <summary>
    /// The prep time of the recipe.
    /// </summary>
    [Column(TypeName = "tinytext")]
    public string? PrepTime { get; set; }

    /// <summary>
    /// The total time of the recipe.
    /// </summary>
    [Column(TypeName = "tinytext")]
    public string? TotalTime { get; set; }

    /// <summary>
    /// The yield of the recipe.
    /// </summary>
    [Column(TypeName = "tinytext")]
    public string? Yield { get; set; }

    /// <summary>
    /// The servings of the recipe.
    /// </summary>
    [Column(TypeName = "tinytext")]
    public string? Servings { get; set; }

    /// <summary>
    /// The calories of the recipe.
    /// </summary>
    [Column(TypeName = "smallint")]
    public int? Calories { get; set; }

    /// <summary>
    /// A list of <see cref="RecipeCategory"/>s for the recipe.
    /// </summary>
    [Column(TypeName = "text")]
    public required IEnumerable<RecipeCategory> Categories { get; set; }

    /// <summary>
    /// A list of <see cref="DietaryRestriction"/>s for the recipe.
    /// </summary>
    [Column(TypeName = "text")]
    public required IEnumerable<DietaryRestriction> DietaryRestrictions { get; set; }
}
}
