using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using tensai_sses.Models;

namespace tensai_sses.Data;

public class MyDbContext : DbContext
{
   public MyDbContext(DbContextOptions<MyDbContext> options) : base(options){ }

    public DbSet<Models.Environments> deployable_environments { get; set;}

     protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Models.Environments>()
            .HasIndex(p => new { p.name })
            .IsUnique(true);
    }
   
}
