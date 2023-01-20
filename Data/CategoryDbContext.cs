using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Models;

    public class CategoryDbContext : DbContext
    {
        public CategoryDbContext (DbContextOptions<CategoryDbContext> options)
            : base(options)
        {
        }

        public DbSet<tensai_sses.Models.Category> Category { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<tensai_sses.Models.Category>()
            .HasIndex(p => new { p.name })
            .IsUnique(true);

    }
    }
