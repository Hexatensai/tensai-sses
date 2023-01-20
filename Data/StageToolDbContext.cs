using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Models;

    public class StageToolDbContext : DbContext
    {
        public StageToolDbContext (DbContextOptions<StageToolDbContext> options) : base(options)
        {
        }

        public DbSet<tensai_sses.Models.StageTool> stages_tools_mapping { get; set; } = default!;
        public DbSet<tensai_sses.Models.SupportTools> tensai_supported_tools { get; set; }
        public DbSet<tensai_sses.Models.PipelineStages> pipeline_stages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<tensai_sses.Models.StageTool>()
            .HasIndex(p => new { p.name })
            .IsUnique(true);

    }
}
