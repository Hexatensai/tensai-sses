using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace tensai_sses.Models;

public class StageTool
{
    public int id { get; set; }

    public string name { get; set; }

    public string description { get; set; }

    public DateTime updated_on { get; set; }

    public int version { get; set; }

    public bool is_active { get; set; }

    public string access_url { get; set; }

    public string cred_type  { get; set; }

    public string cred_user  { get; set; }

    public string cred_secret { get; set; }

    //public string tool_id  { get; set; }

    public int updated_by_id { get; set; }

    [ForeignKey("pipelinestages")] 
    public int stage_id { get; set; }
    public virtual PipelineStages? pipelinestages { get; set; }


    [ForeignKey("supporttools")]
    public int tool_id { get; set; }
    public virtual SupportTools? supporttools { get; set; }

}
