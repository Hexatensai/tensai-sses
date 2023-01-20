using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Data;
using tensai_sses.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Cors.Infrastructure;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseSqlite(connectionString));

builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddDbContext<StageToolDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddDbContext<PipelineStagesDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddDbContext<ProjectDBContext>(options =>
    options.UseNpgsql(connectionString));

    builder.Services.AddDbContext<SupportToolsDBContext>(options =>
    options.UseNpgsql(connectionString));

     builder.Services.AddDbContext<CategoryDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddDbContext<ProjectEnvironmentDbContext>(options =>
    options.UseNpgsql(connectionString));

    builder.Services.AddDbContext<PipelineHistoryDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

builder.Services.AddControllersWithViews();


builder.Services.AddCors(p=> p.AddPolicy("corspolicy",build=>
{
    build.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
}));


builder.Services.AddRazorPages();




var app = builder.Build();




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
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
app.UseCors("corspolicy");

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html");



app.Run();
