using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
  public class Ingredient
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public required int Id { get; set; }

    [Column(TypeName = "varchar(64)")]
    public required string Name { get; set; }
  }
}
