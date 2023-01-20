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
using System.Collections;

namespace tensai_sses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StageToolController : ControllerBase
    {
        private readonly StageToolDbContext _context;

        public StageToolController(StageToolDbContext context)
        {
            _context = context;
        }


// GET: api/StageTool
        [HttpGet]
        public async Task<IEnumerable> GetStageTool()
        {

           
            var balance = (from a in _context.stages_tools_mapping
                           join c in _context.tensai_supported_tools on a.tool_id equals c.id
                           join d in _context.pipeline_stages on a.stage_id equals d.id
                          // where a.stage_id == d.id
                           select new
                           {
                               id=a.id,
                               stagetoolname=a.name,
                               stagetooldescription=a.description,

                               
                               toolname=c.name,
                               supptooldescr = c.description,

                               pipelinename=d.name,
                               pipelinedescr=d.description,

                               accessurl =a.access_url,
                               stageid=a.stage_id,
                               toolid=a.tool_id,
                               version=a.version,
                               isActive=a.is_active,
                               updated_on=a.updated_on,
                               cred_type=a.cred_type,
                               cred_user= a.cred_user,
                               cred_secret= a.cred_secret,
                               updated_by_id= a.updated_by_id

                           }).ToList();
            return balance;



        }
        // // GET: api/StageTool
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<StageTool>>> GetStageTool()
        // {
        //   if (_context.stages_tools_mapping == null)
        //   {
        //       return NotFound();
        //   }
        //     return await _context.stages_tools_mapping.ToListAsync();
        // }

        // GET: api/StageTool/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StageTool>> GetStageTool(int id)
        {
          if (_context.stages_tools_mapping == null)
          {
              return NotFound();
          }
            var stageTool = await _context.stages_tools_mapping.FindAsync(id);

            if (stageTool == null)
            {
                return NotFound();
            }

            return stageTool;
        }

        // PUT: api/StageTool/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStageTool(int id, StageTool stageTool)
        {
            if (id != stageTool.id)
            {
                return BadRequest();
            }

            _context.Entry(stageTool).State = EntityState.Modified;

            try
            {
                _context.Update(stageTool);
                await _context.SaveChangesAsync();
                stageTool = await _context.stages_tools_mapping.Where(e => e.id == stageTool.id).FirstOrDefaultAsync();
                stageTool.version += 1;
                stageTool.updated_on = DateTime.Now;
                stageTool.is_active = true;
                stageTool.updated_by_id = 87361;
                _context.Update(stageTool);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StageToolExists(id))
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

        // POST: api/StageTool
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StageTool>> PostStageTool(StageTool stageTool)
        {
          if (_context.stages_tools_mapping == null)
          {
              return Problem("Entity set 'StageToolDbContext.StageTool'  is null.");
          }
            stageTool.version = 1;
            stageTool.updated_on = DateTime.Now;
            stageTool.is_active = true;
            stageTool.updated_by_id = 87361;
            _context.stages_tools_mapping.Add(stageTool);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStageTool", new { id = stageTool.id }, stageTool);
        }

        // DELETE: api/StageTool/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStageTool(int id)
        {
            if (_context.stages_tools_mapping == null)
            {
                return NotFound();
            }
            var stageTool = await _context.stages_tools_mapping.FindAsync(id);
            if (stageTool == null)
            {
                return NotFound();
            }
            stageTool.updated_on = DateTime.Now;
            stageTool.is_active = false;
            // _context.stages_tools_mapping.Remove(stageTool);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StageToolExists(int id)
        {
            return (_context.stages_tools_mapping?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
