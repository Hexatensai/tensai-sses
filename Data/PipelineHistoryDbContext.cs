using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Models;

public class PipelineHistoryDbContext : DbContext
    {
        public PipelineHistoryDbContext (DbContextOptions<PipelineHistoryDbContext> options)
            : base(options)
        {
        }

        public DbSet<tensai_sses.Models.PipelineHistory> pipeline_history { get; set; } 
    }
