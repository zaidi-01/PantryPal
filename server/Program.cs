using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

var builder = WebApplication.CreateBuilder(args);

ConfigureAppSettings(builder);
ConfigureServices(builder);

var app = builder.Build();

Configure(app);
await SeedAdminUser(builder, app);

app.Run();

/// <summary>
/// Configures the application settings by loading configuration from appsettings.json and appsettings.{environment}.json files.
/// </summary>
/// <param name="builder">The <see cref="WebApplicationBuilder"/> instance.</param>
void ConfigureAppSettings(WebApplicationBuilder builder)
{
  var configDirectory = Path.Combine(builder.Environment.ContentRootPath, "Config");
  builder.Configuration.AddJsonFile(Path.Combine(configDirectory, "appsettings.json"), optional: false, reloadOnChange: true);
  builder.Configuration.AddJsonFile(Path.Combine(configDirectory, $"appsettings.{builder.Environment.EnvironmentName}.json"), optional: true, reloadOnChange: true);
}

/// <summary>
/// Configures the application services.
/// </summary>
/// <param name="builder">The <see cref="WebApplicationBuilder"/> instance.</param>
void ConfigureServices(WebApplicationBuilder builder)
{
  var config = builder.Configuration;
  var connectionString = config.GetConnectionString("DefaultConnection") ?? throw new Exception("Could not find connection string");

  builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySQL(connectionString));
  builder.Services.AddDatabaseDeveloperPageExceptionFilter();

  builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

  builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

  builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

  builder.Services.ConfigureApplicationCookie(options =>
  {
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
    options.LoginPath = "/Identity/Account/Login";
    options.SlidingExpiration = true;
  });

  builder.Services.AddControllersWithViews();
  builder.Services.AddRazorPages();
}

/// <summary>
/// Configures the application.
/// </summary>
/// <param name="app">The <see cref="WebApplication"/> instance.</param>
void Configure(WebApplication app)
{
  // Configure the HTTP request pipeline.
  if (app.Environment.IsDevelopment())
  {
    app.UseMigrationsEndPoint();
  }
  else
  {
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
  }

  app.UseHttpsRedirection();
  app.UseStaticFiles();
  app.UseRouting();

  app.UseAuthentication();
  app.UseIdentityServer();
  app.UseAuthorization();

  app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
  app.MapRazorPages();

  app.MapFallbackToFile("index.html"); ;
}

/// <summary>
/// Seeds the admin user.
/// </summary>
/// <param name="builder">The <see cref="WebApplicationBuilder"/> instance.</param>
/// <param name="app">The <see cref="WebApplication"/> instance.</param>
async Task SeedAdminUser(WebApplicationBuilder builder, WebApplication app)
{
  using (var scope = app.Services.CreateScope())
  {
    var services = scope.ServiceProvider;

    var config = services.GetRequiredService<IConfiguration>();
    var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    var adminRole = new IdentityRole("Admin") ?? throw new Exception("Could not create admin role");
    if (!await roleManager.RoleExistsAsync(adminRole.Name!))
    {
      await roleManager.CreateAsync(adminRole);
    }

    var adminUsername = config["Admin:Username"];
    if (String.IsNullOrEmpty(adminUsername))
    {
      throw new Exception("Admin username not set");
    }

    var adminPassword = config["Admin:Password"];
    if (String.IsNullOrEmpty(adminPassword))
    {
      throw new Exception("Admin password not set");
    }

    var adminUser = new ApplicationUser
    {
      UserName = adminUsername,
      EmailConfirmed = true,

    } ?? throw new Exception("Could not create admin user");

    if (await userManager.FindByNameAsync(adminUser.UserName!) == null)
    {
      var result = await userManager.CreateAsync(adminUser, adminPassword);
      if (!result.Succeeded)
      {
        throw new Exception("Could not create admin user", new AggregateException(result.Errors.Select(e => new Exception(e.Description))));
      }

      await userManager.AddToRoleAsync(adminUser, adminRole.Name!);
    }
  }
}
