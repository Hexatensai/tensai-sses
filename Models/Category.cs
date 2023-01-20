using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace tensai_sses.Models
{
    public class Category
    {
        public int id { get; set; }

       public string name { get; set; }

       public DateTime updated_on { get; set; }

        public int version { get; set; }
         public bool is_active { get; set; }

        public int updated_by_id { get; set; }
    }
}