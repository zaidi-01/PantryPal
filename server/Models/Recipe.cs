using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{

    public class Recipe
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Ingredients { get; set; }
        public required string Directions { get; set; }
        public string? Image { get; set; }
        [Column("date_created")]
        public required DateTime DateCreated { get; set; }
        [Column("date_updated")]
        public required DateTime DateUpdated { get; set; }
        public string? Categories { get; set; }
        [Column("cook_time")]
        public string? CookTime { get; set; }
        [Column("prep_time")]
        public string? PrepTime { get; set; }
        [Column("total_time")]
        public string? TotalTime { get; set; }
        public string? Yield { get; set; }
        public string? Servings { get; set; }
        public int? Calories { get; set; }
        [Column("dietary_restrictions")]
        public string? DietaryRestrictions { get; set; }
    }
}


