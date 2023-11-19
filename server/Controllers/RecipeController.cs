using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;

namespace server.Controllers
{
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
    public async Task<IActionResult> GetDetails(int id)
    {
      // TODO(StevieShibly8): Replace with stored-procedure
      var recipe = await _context.Recipe.SingleOrDefaultAsync(r => r.Id == id);

      if (recipe != null)
      {
        return Ok(recipe);
      }
      else
      {
        return NotFound();
      }
    }
  }
}