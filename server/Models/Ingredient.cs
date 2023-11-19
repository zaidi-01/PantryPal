using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
  [Table("ingredient")]
  public class Ingredient
  {
    public required int Id { get; set; }
    public required string Name { get; set; }
  }
}
