using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Models;

    public class ProjectEnvironmentDbContext : DbContext
    {
        public ProjectEnvironmentDbContext (DbContextOptions<ProjectEnvironmentDbContext> options) : base(options)
        {
        }

        public DbSet<tensai_sses.Models.ProjectEnvironments> project_environments { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<tensai_sses.Models.ProjectEnvironments>()
            .HasIndex(p => new { p.name })
            .IsUnique(true);

    }
}
