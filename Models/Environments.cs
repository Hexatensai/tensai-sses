using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace tensai_sses.Models;

[Index(nameof(name), IsUnique = true)]

public class Environments
{
    public int id { get; set; }

    public string name { get; set; }

    public string description { get; set; }

    public DateTime update_on { get; set; }

    public int version { get; set; }

    public bool is_active { get; set; }

    public int updated_by_id { get; set; }

}
