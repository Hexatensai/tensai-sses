using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Data;
using tensai_sses.Models;

namespace tensai_sses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors("AllowAll")]
    public class EnvironmentsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public EnvironmentsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Environments
        [HttpGet]
        //[EnableCors("AllowAll")]
        public async Task<ActionResult<IEnumerable<Models.Environments>>> Getdeployable_environments()
        {
          if (_context.deployable_environments == null)
          {
              return NotFound();
          }
            return await _context.deployable_environments.ToListAsync();
        }

        // GET: api/Environments/5
        [HttpGet("{id}")]
        //[EnableCors("AllowAll")]
        public async Task<ActionResult<Models.Environments>> GetEnvironments(int id)
        {
          if (_context.deployable_environments == null)
          {
              return NotFound();
          }
            var environments = await _context.deployable_environments.FindAsync(id);

            if (environments == null)
            {
                return NotFound();
            }

            return environments;
        }

        // PUT: api/Environments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[EnableCors("AllowAll")]
        public async Task<IActionResult> PutEnvironments(int id, Models.Environments environments)
        {
            if (id != environments.id)
            {
                return BadRequest();
            }

            _context.Entry(environments).State = EntityState.Modified;

            try
            {
                _context.Update(environments);
                await _context.SaveChangesAsync();
                environments = await _context.deployable_environments.Where(e => e.id == environments.id).FirstOrDefaultAsync();
                environments.version += 1;
                environments.update_on = DateTime.Now;
                environments.is_active = true;
                environments.updated_by_id = 87361;
                _context.Update(environments);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnvironmentsExists(id))
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

        // POST: api/Environments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //[EnableCors("AllowAll")]
        public async Task<ActionResult<Models.Environments>> PostEnvironments(Models.Environments environments)
        {
          if (_context.deployable_environments == null)
          {
              return Problem("Entity set 'MyDbContext.deployable_environments'  is null.");
          }
            environments.version = 1;
            environments.update_on = DateTime.Now;
            environments.is_active = true;
            environments.updated_by_id = 87361;
            _context.deployable_environments.Add(environments);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEnvironments", new { id = environments.id }, environments);
        }

        // DELETE: api/Environments/5
        [HttpDelete("{id}")]
        //[EnableCors("AllowAll")]
        public async Task<IActionResult> DeleteEnvironments(int id)
        {
            if (_context.deployable_environments == null)
            {
                return NotFound();
            }
            var environments = await _context.deployable_environments.FindAsync(id);
            if (environments == null)
            {
                return NotFound();
            }
            environments.update_on = DateTime.Now;
            environments.is_active = false;
            //_context.deployable_environments.Remove(environments);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EnvironmentsExists(int id)
        {
            return (_context.deployable_environments?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
