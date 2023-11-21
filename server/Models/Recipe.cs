using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
  public class Recipe
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public required int Id { get; set; }

    [Column(TypeName = "tinytext")]
    public required string Name { get; set; }

    [Column(TypeName = "text")]
    public required string Description { get; set; }

    [Column(TypeName = "text")]
    public required string Ingredients { get; set; }

    [Column(TypeName = "text")]
    public required string Directions { get; set; }

    [Column(TypeName = "text")]
    public string? Image { get; set; }

    [Column(TypeName = "datetime(6)")]
    public required DateTime DateCreated { get; set; }

    [Column(TypeName = "datetime(6)")]
    public required DateTime DateUpdated { get; set; }

    [Column(TypeName = "tinytext")]
    public string? Categories { get; set; }

    [Column(TypeName = "tinytext")]
    public string? CookTime { get; set; }

    [Column(TypeName = "tinytext")]
    public string? PrepTime { get; set; }

    [Column(TypeName = "tinytext")]
    public string? TotalTime { get; set; }

    [Column(TypeName = "tinytext")]
    public string? Yield { get; set; }

    [Column(TypeName = "tinytext")]
    public string? Servings { get; set; }

    [Column(TypeName = "smallint")]
    public int? Calories { get; set; }

    [Column(TypeName = "text")]
    public string? DietaryRestrictions { get; set; }
  }
}
