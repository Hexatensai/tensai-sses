using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Models;


public class ProjectDBContext: DbContext
    {
         public ProjectDBContext(DbContextOptions<ProjectDBContext> options) : base(options){ }

    public DbSet<tensai_sses.Models.Project> project_main { get; set; }
    public DbSet<tensai_sses.Models.ProjectEnvironments> project_environments { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<tensai_sses.Models.Project>()
            .HasIndex(p => new { p.name })
            .IsUnique(true);

        modelBuilder.Entity<tensai_sses.Models.ProjectEnvironments>()
            .HasIndex(p => new { p.name })
            .IsUnique(true);

    }

    }
