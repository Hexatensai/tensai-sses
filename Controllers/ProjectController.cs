using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Models;
using tensai_sses.Data;
using Microsoft.Extensions.Hosting;
using static System.Runtime.InteropServices.JavaScript.JSType;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace tensai_sses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectDBContext _context;

        public ProjectController(ProjectDBContext context)
        {
            _context = context;
        }

        // GET: api/Project
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProject()
        {
          if (_context.project_main == null)
          {
              return NotFound();
          }
            return await _context.project_main.ToListAsync();
        }

        // GET: api/Project/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
          if (_context.project_main == null)
          {
              return NotFound();
          }
            var project = await _context.project_main.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        // PUT: api/Project/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.id)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                 _context.Update(project);
                await _context.SaveChangesAsync();
                project = await _context.project_main.Where(e => e.id == project.id).FirstOrDefaultAsync();
                project.version += 1;
                project.updated_on = DateTime.Now;
                project.is_active = true;
                project.updated_by_id = 87361;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Project
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
          if (_context.project_main == null)
          {
              return Problem("Entity set 'ProjectDBContext.Project'  is null.");
          }
            project.version = 1;
            project.updated_on = DateTime.Now;
            project.is_active = true;
            project.updated_by_id = 87361;
            _context.project_main.Add(project);
            await _context.SaveChangesAsync();

            //return RedirectToAction("PostProjectEnvironments", new { name = project.name, description = project.description });

             ProjectEnvironments projectenv = new ProjectEnvironments();

             string[] environments = project.project_deploy_env.Split(',');
            
            // HttpClient http = new HttpClient();

            // //HttpResponseMessage response = await http.GetAsync("https://52.146.8.157:7249/api/environments/");

            foreach (var item in environments)
            {
                var EnvId = _context.project_environments
                       .OrderByDescending(p => p.updated_on)
                       .FirstOrDefault();
                if (EnvId != null)
                {
                    projectenv.id = EnvId.id + 1;
                }
                projectenv.version = 1;
                projectenv.updated_on = DateTime.Now;
                projectenv.name = project.name + "_" + item;
                projectenv.description = projectenv.name;
                projectenv.updated_by_id = project.updated_by_id;
                projectenv.is_active = true;
                projectenv.project_id = project.id;
                projectenv.env_id = Convert.ToInt32(item);
                _context.project_environments.Add(projectenv);
                await _context.SaveChangesAsync();

            }

            //return RedirectToAction("PostProjectEnvironments", "ProjectEnvironmentController", project);
            return CreatedAtAction("GetProject", new { id = project.id }, project);
        }

        // DELETE: api/Project/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            if (_context.project_main == null)
            {
                return NotFound();
            }
            var project = await _context.project_main.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.project_main.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return (_context.project_main?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
