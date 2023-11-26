using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;

namespace server.Controllers
{
  public class SearchModel
  {
    public string? SearchQuery { get; set; }
  }

  [ApiController]
  [Route("api/[controller]")]
  public class RecipeController : ControllerBase
  {

    private readonly ApplicationDbContext _context;
    public RecipeController(ApplicationDbContext context)
    {
      _context = context;
    }

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

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
      // Delete recipe
      var result = await _context.Recipe.Where(r => r.Id == id).ExecuteDeleteAsync();

      if (result == 0)
      {
        return NotFound();
      };

      return Ok();
    }

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