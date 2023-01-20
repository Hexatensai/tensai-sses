using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Models;

namespace tensai_sses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectEnvironmentController : ControllerBase
    {
        private readonly ProjectEnvironmentDbContext _context;

        public ProjectEnvironmentController(ProjectEnvironmentDbContext context)
        {
            _context = context;
        }

  

        // GET: api/ProjectEnvironment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectEnvironments>>> GetProjectEnvironments()
        {
          if (_context.project_environments == null)
          {
              return NotFound();
          }
            return await _context.project_environments.ToListAsync();
        }

        // GET: api/ProjectEnvironment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectEnvironments>> GetProjectEnvironments(int id)
        {
          if (_context.project_environments == null)
          {
              return NotFound();
          }
            var projectEnvironments = await _context.project_environments.FindAsync(id);

            if (projectEnvironments == null)
            {
                return NotFound();
            }

            return projectEnvironments;
        }

        // PUT: api/ProjectEnvironment/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectEnvironments(int id, ProjectEnvironments projectEnvironments)
        {
            if (id != projectEnvironments.id)
            {
                return BadRequest();
            }

            _context.Entry(projectEnvironments).State = EntityState.Modified;

            try
            {
                _context.Update(projectEnvironments);
                await _context.SaveChangesAsync();
                projectEnvironments = await _context.project_environments.Where(e => e.id == projectEnvironments.id).FirstOrDefaultAsync();
                projectEnvironments.version += 1;
                projectEnvironments.updated_on = DateTime.Now;
                projectEnvironments.is_active = true;
                projectEnvironments.updated_by_id = 87361;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectEnvironmentsExists(id))
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

        // POST: api/ProjectEnvironment
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProjectEnvironments>> PostProjectEnvironments(ProjectEnvironments projectEnvironments)
        {
          if (_context.project_environments == null)
          {
              return Problem("Entity set 'ProjectEnvironmentDbContext.ProjectEnvironments'  is null.");
          }
            projectEnvironments.version = 1;
            projectEnvironments.updated_on = DateTime.Now;
            projectEnvironments.is_active = true;
            projectEnvironments.updated_by_id = 87361;
            _context.project_environments.Add(projectEnvironments);
           // await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectEnvironments", new { id = projectEnvironments.id }, projectEnvironments);
        }


        // DELETE: api/ProjectEnvironment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectEnvironments(int id)
        {
            if (_context.project_environments == null)
            {
                return NotFound();
            }
            var projectEnvironments = await _context.project_environments.FindAsync(id);
            if (projectEnvironments == null)
            {
                return NotFound();
            }

            _context.project_environments.Remove(projectEnvironments);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectEnvironmentsExists(int id)
        {
            return (_context.project_environments?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
