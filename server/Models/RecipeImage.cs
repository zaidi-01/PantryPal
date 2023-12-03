using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
  /// <summary>
  /// An image for a recipe.
  /// </summary>
  public class RecipeImage
  {
    /// <summary>
    /// The image ID.
    /// </summary>
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    /// <summary>
    /// The image data.
    /// </summary>
    [Column(TypeName = "mediumblob")]
    public required byte[] ImageData { get; set; }

    /// <summary>
    /// The ID of the recipe this image belongs to.
    /// </summary>
    [ForeignKey("Recipe")]
    public int RecipeId { get; set; }
    public Recipe? Recipe { get; set; }
  }
}
