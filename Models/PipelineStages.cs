using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
namespace tensai_sses.Models;

public class PipelineStages
{
    public int id { get; set; }

 //[InverseProperty("PipelineStages")]
   // 

    public string name { get; set; }

    public string description { get; set; }

    public DateTime updated_on { get; set; }

    public int version { get; set; }

     public bool is_active { get; set; }

     public int updated_by_id { get; set; }

     //public ICollection<StageTool> StageTools { get; set; }

    //public StageTool StageTools { get; set; }
}
