using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FridgeController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public FridgeController(ApplicationDbContext context) 
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Test()
        {
            var ingredients = await _context.Ingredient.ToListAsync();
            if (ingredients != null)
            {
                return Ok(ingredients);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
