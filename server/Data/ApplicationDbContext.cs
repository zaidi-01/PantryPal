using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Options;
using server.Enums;
using server.Models;

namespace server.Data
{
  public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
  {
    public DbSet<Recipe> Recipe { get; set; }
    public DbSet<RecipeImage> RecipeImage { get; set; }
    public DbSet<Ingredient> Ingredient { get; set; }

    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
      : base(options, operationalStoreOptions) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Recipe constraints
      modelBuilder.Entity<Recipe>().ToTable(table =>
      {
        table.HasCheckConstraint("CK_Recipe_Calories", "Calories >= 0");
        table.HasCheckConstraint("CK_Recipe_DateUpdated", "DateUpdated >= DateCreated");
      });

      // Recipe categories and dietary restrictions
      modelBuilder.Entity<Recipe>().Property(recipe => recipe.Categories).HasConversion(
        categories => string.Join(',', categories),
        categories =>
          categories.Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(category => Enum.Parse<RecipeCategory>(category))
            .AsEnumerable(),
        new ValueComparer<IEnumerable<RecipeCategory>>(
          (c1, c2) => c1!.SequenceEqual(c2!),
          c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
          c => c.AsEnumerable()
        ));
      modelBuilder.Entity<Recipe>().Property(recipe => recipe.DietaryRestrictions).HasConversion(
        dietaryRestrictions => string.Join(',', dietaryRestrictions),
        dietaryRestrictions =>
          dietaryRestrictions.Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(dietaryRestriction => Enum.Parse<DietaryRestriction>(dietaryRestriction))
            .AsEnumerable(),
        new ValueComparer<IEnumerable<DietaryRestriction>>(
          (c1, c2) => c1!.SequenceEqual(c2!),
          c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
          c => c.AsEnumerable()
        ));

      // Ingredient constraints
      modelBuilder.Entity<Ingredient>().HasIndex(ingredient => ingredient.Name).IsUnique();
    }
  }
}
