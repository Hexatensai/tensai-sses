using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Models;

    public class SupportToolsDBContext : DbContext
    {
        public SupportToolsDBContext (DbContextOptions<SupportToolsDBContext> options)
            : base(options)
        {
        }

        public DbSet<tensai_sses.Models.SupportTools> tensai_supported_tools { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<tensai_sses.Models.SupportTools>()
            .HasIndex(p => new { p.name })
            .IsUnique(true);
            
    }
    }
