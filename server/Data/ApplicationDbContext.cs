using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using server.Models;

namespace server.Data
{
  public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
  {
    public DbSet<Recipe> Recipe { get; set; }
    public DbSet<Ingredient> Ingredient { get; set; }

    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
      : base(options, operationalStoreOptions) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<Recipe>().ToTable(table =>
      {
        table.HasCheckConstraint("CK_Recipe_Calories", "Calories >= 0");
        table.HasCheckConstraint("CK_Recipe_DateUpdated", "DateUpdated >= DateCreated");
      });

      modelBuilder.Entity<Ingredient>().HasIndex(ingredient => ingredient.Name).IsUnique();
    }
  }
}
