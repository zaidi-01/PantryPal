using System.Text.Json;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Enums;
using server.Models;

namespace server.Controllers
{

  /// <summary>
  /// A model for filtering recipes.
  /// </summary>
  /// <typeparam name="string">The type of the filter key.</typeparam>
  /// <typeparam name="List<string>">The type of the filter value.</typeparam>
  public class Filter
  {
    /// <summary>
    /// The filter key.
    /// </summary>
    public required string Key { get; set; }
    /// <summary>
    /// The filter value.
    /// </summary>
    public required List<string> Value { get; set; }
  }


  /// <summary>
  /// A model for searching recipes.
  /// </summary>
  public class SearchModel
  {
    /// <summary>
    /// The search query.
    /// </summary>
    public required string SearchQuery { get; set; }
    /// <summary>
    /// The number of recipes to skip.
    /// </summary>
    public required int Skip { get; set; }
    /// <summary>
    /// The number of recipes to take.
    /// </summary>
    public required int Take { get; set; }
    /// <summary>
    /// The filters to apply.
    /// </summary>
    public List<Filter>? Filters { get; set; }
    /// <summary>
    /// The field to sort by.
    /// </summary>
    public string? SortBy { get; set; }
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
            opt => opt.MapFrom(src => src.Images.Select(i => i.Id)));
      });
    }
    /// <summary>
    /// Creates a new recipe.
    /// </summary>
    /// <param name="recipeDTO">The <see cref="RecipeCreateDTO"/> instance.</param>
    /// <returns>The ID of the newly created recipe.</returns>
    [HttpPost]
    [Route("")]
    [Authorize(Roles = "Admin")]
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
        Categories = (List<RecipeCategory>)recipeDTO.Categories,
        DietaryRestrictions = (List<DietaryRestriction>)recipeDTO.DietaryRestrictions,
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
    [Authorize(Roles = "Admin")]
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
    /// Add an Image by recipe ID.
    /// </summary>
    /// <param name="id">The ID of the recipe.</param>
    /// <param name="image">The image to add.</param>
    /// <returns>The ID of the newly created image.</returns>
    [HttpPost]
    [Route("{id:int}/image")]
    [Authorize(Roles = "Admin")]
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
    /// <param name="searchModel">The <see cref="SearchModel"/> instance.</param>
    /// <returns>A list of recipes matching the search query.</returns>
    [HttpPost]
    [Route("search")]
    public async Task<IActionResult> SearchRecipes([FromBody] SearchModel searchModel)
    {

      var searchQuery = searchModel.SearchQuery;
      var skip = searchModel.Skip;
      var take = searchModel.Take;
      var filters = searchModel.Filters;
      var sortBy = searchModel.SortBy;

      var recipes = _context.Recipe
        .Where(r => r.Name.ToLower().Contains(searchQuery.ToLower()));

      if (filters != null)
      {
        foreach (var filter in filters)
        {
          var filterName = filter.Key;

          // TODO: Implement filtering by categories and dietary restrictions
          // if (filterName == "Categories")
          // {
          //   List<RecipeCategory> filterValues = filter.Value.ConvertAll(f => (RecipeCategory)Enum.Parse(typeof(RecipeCategory), f.ToString()));
          //   recipes = recipes.Where(r => r.Categories.Any(c => filterValues.Contains(c)));
          // }
          // else if (filterName == "DietaryRestrictions")
          // {
          //   List<DietaryRestriction> filterValues = filter.Value.ConvertAll(f => (DietaryRestriction)Enum.Parse(typeof(DietaryRestriction), f.ToString()));
          //   recipes = recipes.Where(r => filterValues.All(f => r.DietaryRestrictions.Contains(f)));
          // }

          if (filterName == "Ingredients")
          {
            // Select recipes that have all the Ingredients in the filter value
            foreach (var filterValue in filter.Value)
            {
              recipes = recipes.Where(r => r.Ingredients.ToLower().Contains(filterValue.ToLower()));
            }
          }
        }
      }

      if (sortBy != null)
      {
        switch (sortBy)
        {
          case "NameAsc":
            recipes = recipes.OrderBy(r => r.Name);
            break;
          case "NameDesc":
            recipes = recipes.OrderByDescending(r => r.Name);
            break;
          case "CaloriesAsc":
            recipes = recipes.OrderBy(r => r.Calories);
            break;
          case "CaloriesDesc":
            recipes = recipes.OrderByDescending(r => r.Calories);
            break;
          default:
            break;
        }
      }

      recipes = recipes.Skip(skip).Take(take);

      var recipeDTOs = await recipes.ProjectTo<RecipeDTO>(_mapperConfiguration).ToListAsync();

      return Ok(recipeDTOs);
    }

    /// <summary>
    /// Retrieves a recipe image by its ID.
    /// </summary>
    /// <param name="id">The ID of the recipe image.</param>
    /// <returns>The recipe image with the specified ID.</returns>
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