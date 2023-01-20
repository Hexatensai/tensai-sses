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

namespace tensai_sses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportToolsController : ControllerBase
    {
        private readonly SupportToolsDBContext _context;

        public SupportToolsController(SupportToolsDBContext context)
        {
            _context = context;
        }

        // GET: api/SupportTools
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupportTools>>> GetSupportTools()
        {
          if (_context.tensai_supported_tools == null)
          {
              return NotFound();
          }
            return await _context.tensai_supported_tools.ToListAsync();
        }

        // GET: api/SupportTools/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SupportTools>> GetSupportTools(int id)
        {
          if (_context.tensai_supported_tools == null)
          {
              return NotFound();
          }
            var supportTools = await _context.tensai_supported_tools.FindAsync(id);

            if (supportTools == null)
            {
                return NotFound();
            }

            return supportTools;
        }

        // PUT: api/SupportTools/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupportTools(int id, SupportTools supportTools)
        {
            if (id != supportTools.id)
            {
                return BadRequest();
            }

            _context.Entry(supportTools).State = EntityState.Modified;

            try
            {
                _context.Update(supportTools);
                await _context.SaveChangesAsync();
                supportTools = await _context.tensai_supported_tools.Where(e => e.id == supportTools.id).FirstOrDefaultAsync();
                supportTools.version += 1;
                supportTools.updated_on = DateTime.Now;
                supportTools.is_active = true;
                _context.Update(supportTools);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupportToolsExists(id))
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

        // POST: api/SupportTools
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SupportTools>> PostSupportTools(SupportTools supportTools)
        {
          if (_context.tensai_supported_tools == null)
          {
              return Problem("Entity set 'SupportToolsDBContext.SupportTools'  is null.");
          }
            supportTools.version = 1;
            supportTools.updated_on = DateTime.Now;
            supportTools.is_active = true;
            _context.tensai_supported_tools.Add(supportTools);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSupportTools", new { id = supportTools.id }, supportTools);
        }

        // DELETE: api/SupportTools/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupportTools(int id)
        {
            if (_context.tensai_supported_tools == null)
            {
                return NotFound();
            }
            var supportTools = await _context.tensai_supported_tools.FindAsync(id);
            if (supportTools == null)
            {
                return NotFound();
            }
            supportTools.updated_on = DateTime.Now;
            supportTools.is_active = false;
            //_context.tensai_supported_tools.Remove(supportTools);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SupportToolsExists(int id)
        {
            return (_context.tensai_supported_tools?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
