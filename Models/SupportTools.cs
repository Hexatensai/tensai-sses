using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tensai_sses.Models
{
    public class SupportTools
    {
        public int id { get; set; }
         public string name { get; set; }
         public string description { get; set; }
         public DateTime updated_on { get; set; }
         public int version { get; set; }
         public bool is_active { get; set; }
    }
}