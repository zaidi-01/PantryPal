using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;

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
    private readonly MapperConfiguration _mapperConfiguration;

    /// <summary>
    /// Initializes a new instance of the <see cref="RecipeController"/> class.
    /// </summary>
    /// <param name="context">The application database context.</param>
    public RecipeController(ApplicationDbContext context)
    {
      _context = context;
      _mapperConfiguration = new MapperConfiguration(cfg =>
      {
        cfg
          .CreateProjection<Recipe, RecipeDTO>()
          .ForMember(
            dest => dest.ImageIds,
            opt => opt.MapFrom(src => src.Images != null ? src.Images.Select(i => i.Id) : new int[0]));
      });
    }

    [HttpPost]
    [Route("")]
    public async Task<IActionResult> CreateRecipe([FromBody] RecipeCreateDTO recipeDTO)
    {
      var recipe = new Recipe
      {
        Name = recipeDTO.Name,
        Description = recipeDTO.Description,
        Ingredients = recipeDTO.Ingredients,
        Directions = recipeDTO.Directions,
        CookTime = recipeDTO.CookTime,
        PrepTime = recipeDTO.PrepTime,
        TotalTime = recipeDTO.TotalTime,
        Yield = recipeDTO.Yield,
        Servings = recipeDTO.Servings,
        Calories = recipeDTO.Calories,
        Categories = recipeDTO.Categories,
        DietaryRestrictions = recipeDTO.DietaryRestrictions,
        DateCreated = DateTime.UtcNow,
        DateUpdated = DateTime.UtcNow,
      };

      await _context.Recipe.AddAsync(recipe);
      await _context.SaveChangesAsync();

      return Ok(recipe.Id);
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
      var recipe = await _context.Recipe
        .ProjectTo<RecipeDTO>(_mapperConfiguration)
        .FirstOrDefaultAsync(r => r.Id == id);

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

    [HttpPost]
    [Route("{id:int}/image")]
    public async Task<IActionResult> AddRecipeImage(int id, [FromForm] IFormFile image)
    {
      // TODO: Investigate why images are not being saved to the database
      var recipe = await _context.Recipe.FirstOrDefaultAsync(r => r.Id == id);

      if (recipe == null)
      {
        return NotFound();
      }

      using var memoryStream = new MemoryStream();
      await image.CopyToAsync(memoryStream);

      if (memoryStream.Length > 1048576)
      {
        return BadRequest("Image must be less than 1MB.");
      }

      var recipeImage = new RecipeImage { ImageData = memoryStream.ToArray() };

      await _context.RecipeImage.AddAsync(recipeImage);
      await _context.SaveChangesAsync();

      return Ok(recipeImage.Id);
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
        .ProjectTo<RecipeDTO>(_mapperConfiguration)
        .ToListAsync();

      return Ok(recipes);
    }

    [HttpGet]
    [Route("image/{id:int}")]
    public async Task<IActionResult> GetRecipeImage(int id)
    {
      var recipeImage = await _context.RecipeImage.FirstOrDefaultAsync(i => i.Id == id);

      if (recipeImage == null)
      {
        return NotFound();
      }

      return File(recipeImage.ImageData, "image/jpeg");
    }
  }
}