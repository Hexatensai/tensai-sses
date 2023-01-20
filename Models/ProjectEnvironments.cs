using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace tensai_sses.Models;

public class ProjectEnvironments
{
    public int id { get; set; }

    public string name { get; set; }

    public string description { get; set; }

    public DateTime updated_on { get; set; }

    public int version { get; set; }

    public bool is_active { get; set; }
    public int updated_by_id { get; set; }

    [ForeignKey("environments")] 
    public int env_id { get; set; }
    public virtual Environments? environments { get; set; }


    [ForeignKey("projects")]
    public int project_id { get; set; }
    public virtual Project? projects { get; set; }

}
