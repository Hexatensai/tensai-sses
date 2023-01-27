using Microsoft.AspNetCore.Identity;

namespace tensai_sses.Models
{
    public class Project
    {
        public int id { get; set; }
         public string name { get; set; }

        public string description { get; set; }
        public DateTime updated_on { get; set; }
          public int version { get; set; }
          public bool is_active { get; set; }
          public string scm_tool { get; set; }
          public string build { get; set; }
          public string code_analysis { get; set; }
          public string dependency_check { get; set; }
          public string artifactory { get; set; }
          public string sast { get; set; }
          public string dast { get; set; }
          public bool deploy { get; set; }
          public int updated_by_id { get; set; }
          public string project_deploy_env { get; set; }
          public string category { get; set; }

          public string CICD { get; set; }

    }
}