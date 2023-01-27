using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Models;

    public class CICDDBContext : DbContext
    {
        public CICDDBContext (DbContextOptions<CICDDBContext> options)
            : base(options)
        {
        }

        public DbSet<tensai_sses.Models.CICD> cicd_main { get; set; } = default!;

          protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<tensai_sses.Models.CICD>()
            .HasIndex(p => new { p.name })
            .IsUnique(true);

    }
    }
