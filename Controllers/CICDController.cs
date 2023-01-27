using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Models;
using tensai_sses.Data;

namespace tensai_sses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CICDController : ControllerBase
    {
        private readonly CICDDBContext _context;

        public CICDController(CICDDBContext context)
        {
            _context = context;
        }

        // GET: api/CICD
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CICD>>> GetCICD()
        {
          if (_context.cicd_main == null)
          {
              return NotFound();
          }
            return await _context.cicd_main.ToListAsync();
        }

        // GET: api/CICD/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CICD>> GetCICD(int id)
        {
          if (_context.cicd_main == null)
          {
              return NotFound();
          }
            var cICD = await _context.cicd_main.FindAsync(id);

            if (cICD == null)
            {
                return NotFound();
            }

            return cICD;
        }

        // PUT: api/CICD/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCICD(int id, CICD cICD)
        {
            if (id != cICD.id)
            {
                return BadRequest();
            }

            _context.Entry(cICD).State = EntityState.Modified;

            try
            {
                _context.Update(cICD);
                await _context.SaveChangesAsync();
                cICD = await _context.cicd_main.Where(e => e.id == cICD.id).FirstOrDefaultAsync();
                cICD.version += 1;
                cICD.updated_on = DateTime.Now;
                cICD.is_active = true;
                cICD.updated_by_id = 87361;
                _context.Update(cICD);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CICDExists(id))
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

        // POST: api/CICD
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CICD>> PostCICD(CICD cICD)
        {
          if (_context.cicd_main == null)
          {
              return Problem("Entity set 'CICDDBContext.CICD'  is null.");
          }
            cICD.version = 1;
            cICD.updated_on = DateTime.Now;
            cICD.is_active = true;
            cICD.updated_by_id = 87361;
            
            _context.cicd_main.Add(cICD);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCICD", new { id = cICD.id }, cICD);
        }

        // DELETE: api/CICD/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCICD(int id)
        {
            if (_context.cicd_main == null)
            {
                return NotFound();
            }
            var cICD = await _context.cicd_main.FindAsync(id);
            if (cICD == null)
            {
                return NotFound();
            }

            _context.cicd_main.Remove(cICD);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CICDExists(int id)
        {
            return (_context.cicd_main?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
