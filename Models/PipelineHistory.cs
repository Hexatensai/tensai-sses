using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;


namespace tensai_sses.Models
{
    public class PipelineHistory
    {
          public int id { get; set; }

           public string scm_tool { get; set; }

            public string branch_name { get; set; }

             public string environment_name { get; set; }

             public string? job_status { get; set; }

              public int build_number { get; set; }
    }
}