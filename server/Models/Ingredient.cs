using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
  /// <summary>
  /// An ingredient.
  /// </summary>
  public class Ingredient
  {
    /// <summary>
    /// The ingredient ID.
    /// </summary>
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public required int Id { get; set; }

    /// <summary>
    /// The name of the ingredient.
    /// </summary>
    [Column(TypeName = "varchar(64)")]
    public required string Name { get; set; }
  }
}
