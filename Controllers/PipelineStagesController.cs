using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using tensai_sses.Models;

namespace tensai_sses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PipelineStagesController : ControllerBase
    {
        private readonly PipelineStagesDbContext _context;

        public PipelineStagesController(PipelineStagesDbContext context)
        {
            _context = context;
        }

        // GET: api/PipelineStages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PipelineStages>>> GetPipelineStages()
        {
          if (_context.pipeline_stages == null)
          {
              return NotFound();
          }
            return await _context.pipeline_stages.ToListAsync();
        }

        // GET: api/PipelineStages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PipelineStages>> GetPipelineStages(int id)
        {
          if (_context.pipeline_stages == null)
          {
              return NotFound();
          }
            var pipelineStages = await _context.pipeline_stages.FindAsync(id);

            if (pipelineStages == null)
            {
                return NotFound();
            }

            return pipelineStages;
        }

        // PUT: api/PipelineStages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPipelineStages(int id, PipelineStages pipelineStages)
        {
            if (id != pipelineStages.id)
            {
                return BadRequest();
            }

            _context.Entry(pipelineStages).State = EntityState.Modified;

            try
            {
                _context.Update(pipelineStages);
                await _context.SaveChangesAsync();
                pipelineStages = await _context.pipeline_stages.Where(e => e.id == pipelineStages.id).FirstOrDefaultAsync();
                pipelineStages.version += 1;
                pipelineStages.updated_on = DateTime.Now;
                pipelineStages.is_active = true;
                pipelineStages.updated_by_id = 87361;
                _context.Update(pipelineStages);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PipelineStagesExists(id))
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

        // POST: api/PipelineStages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PipelineStages>> PostPipelineStages(PipelineStages pipelineStages)
        {
          if (_context.pipeline_stages == null)
          {
              return Problem("Entity set 'PipelineStagesDbContext.PipelineStages'  is null.");
          }
            pipelineStages.version = 1;
            pipelineStages.updated_on = DateTime.Now;
            pipelineStages.is_active = true;
            pipelineStages.updated_by_id = 87361;
            _context.pipeline_stages.Add(pipelineStages);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPipelineStages", new { id = pipelineStages.id }, pipelineStages);
        }

        // DELETE: api/PipelineStages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePipelineStages(int id)
        {
            if (_context.pipeline_stages == null)
            {
                return NotFound();
            }
            var pipelineStages = await _context.pipeline_stages.FindAsync(id);
            if (pipelineStages == null)
            {
                return NotFound();
            }
            pipelineStages.updated_on = DateTime.Now;
            pipelineStages.is_active = false;
            //_context.pipeline_stages.Remove(pipelineStages);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PipelineStagesExists(int id)
        {
            return (_context.pipeline_stages?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
