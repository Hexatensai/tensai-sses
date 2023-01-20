using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using tensai_sses.Models;

public class PipelineStagesDbContext : DbContext
    {
         public PipelineStagesDbContext(DbContextOptions<PipelineStagesDbContext> options) : base(options){ }

    public DbSet<tensai_sses.Models.PipelineStages> pipeline_stages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<tensai_sses.Models.PipelineStages>()
            .HasIndex(p => new { p.name })
            .IsUnique(true);
            
    }

    }
