using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;

namespace server.Controllers
{
  /// <summary>
  /// Controller for managing the fridge.
  /// </summary>
  [ApiController]
  [Route("api/[controller]")]
  public class FridgeController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="FridgeController"/> class.
    /// </summary>
    /// <param name="context">The application database context.</param>
    public FridgeController(ApplicationDbContext context)
    {
      _context = context;
    }

    /// <summary>
    /// Retrieves a list of ingredients in the fridge.
    /// </summary>
    /// <returns>An <see cref="IActionResult"/> representing the response with the list of ingredients.</returns>
    [HttpGet]
    public async Task<IActionResult> GetIngredients()
    {
      var ingredients = await _context.Ingredient.ToListAsync();

      return Ok(ingredients);
    }
  }
}
