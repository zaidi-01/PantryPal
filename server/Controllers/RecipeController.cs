using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;

namespace server.Controllers
{
  public class SearchModel
  {
    public string? SearchQuery { get; set; }
  }

  /// </summary>
  /// Controller for managing recipes.
  /// <summary>
  [ApiController]
  [Route("api/[controller]")]
  public class RecipeController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="RecipeController"/> class.
    /// </summary>
    /// <param name="context">The application database context.</param>
    public RecipeController(ApplicationDbContext context)
    {
      _context = context;
    }

    /// <summary>
    /// Retrieves a recipe by its ID.
    /// </summary>
    /// <param name="id">The ID of the recipe.</param>
    /// <returns>The <see cref="Recipe"/> with the specified ID.</returns>
    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetRecipe(int id)
    {
      // TODO(StevieShibly8): Replace with stored-procedure
      var recipe = await _context.Recipe.FirstOrDefaultAsync(r => r.Id == id);

      if (recipe == null)
      {
        return NotFound();
      }

      return Ok(recipe);
    }

    /// <summary>
    /// Deletes a recipe by its ID.
    /// </summary>
    /// <param name="id">The ID of the recipe to delete.</param>
    /// <returns>An empty response if the recipe was deleted successfully, otherwise NotFound.</returns>
    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
      // Delete recipe
      var result = await _context.Recipe.Where(r => r.Id == id).ExecuteDeleteAsync();

      if (result == 0)
      {
        return NotFound();
      }

      return Ok();
    }

    /// <summary>
    /// Searches for recipes based on the specified search query.
    /// </summary>
    /// <param name="searchModel">The search model containing the search query.</param>
    /// <returns>A list of recipes matching the search query.</returns>
    [HttpPost]
    [Route("search")]
    public async Task<IActionResult> SearchRecipes([FromBody] SearchModel searchModel)
    {
      var recipes = await _context.Recipe
        .Where(r => r.Name.ToLower().Contains((searchModel.SearchQuery ?? "").ToLower()))
        .ToListAsync();

      return Ok(recipes);
    }
  }
}