using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tensai_sses.Models;
using tensai_sses.Data;
using JenkinsNET;
using JenkinsNET.Exceptions;
using JenkinsNET.Models;
using JenkinsNET.Utilities;

namespace tensai_sses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PipelineHistoryController : ControllerBase
    {
        private readonly PipelineHistoryDbContext _context;

        public PipelineHistoryController(PipelineHistoryDbContext context)
        {
            _context = context;
        }

        // GET: api/PipelineHistory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PipelineHistory>>> GetPipelineHistory()
        {
          if (_context.pipeline_history == null)
          {
              return NotFound();
          }
            return await _context.pipeline_history.ToListAsync();
        }

        // GET: api/PipelineHistory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PipelineHistory>> GetPipelineHistory(int id)
        {
          if (_context.pipeline_history == null)
          {
              return NotFound();
          }
            var pipelineHistory = await _context.pipeline_history.FindAsync(id);

            if (pipelineHistory == null)
            {
                return NotFound();
            }

            return pipelineHistory;
        }

        // PUT: api/PipelineHistory/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPipelineHistory(int id, PipelineHistory pipelineHistory)
        {
            if (id != pipelineHistory.id)
            {
                return BadRequest();
            }

            _context.Entry(pipelineHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PipelineHistoryExists(id))
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

        // POST: api/PipelineHistory
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PipelineHistory>> PostPipelineHistory(PipelineHistory pipelineHistory)
        {
          if (_context.pipeline_history == null)
          {
              return Problem("Entity set 'PipelineHistoryDbContext.PipelineHistory'  is null.");
          }

            var client = new JenkinsClient
            {
                BaseUrl = "https://jenkins.qa-hexaware.tensai.click/",
                //BaseUrl = "http://20.15.98.15:8080/",
                UserName = "admin",
                //ApiToken = "118606109c6aee539871960d65fcec1312", //--localhost:8080
                ApiToken = "1146686d577f1d17619327a6424f41a662", // -- jenkins.qa-hexaware.tensai.click
            };
            var runner = new JenkinsJobRunner(client);
            runner.StatusChanged += () => {
                switch (runner.Status)
                {
                    case JenkinsJobStatus.Queued:
                        Console.WriteLine("Job is Queued.");
                        break;
                    case JenkinsJobStatus.Building:
                        Console.WriteLine("Job is Running.");
                        break;
                    case JenkinsJobStatus.Complete:
                        Console.WriteLine("Job is Complete.");
                        break;
                }
            };

            Console.WriteLine($"Starting Job 'unique-tensai'...");
            var AppUrl = string.Join("/", pipelineHistory.applicationURL.Split('/').Skip(1).ToArray());
            IDictionary<string, string> pipelinebuildparameters = new Dictionary<string, string>();
            pipelinebuildparameters.Add("GITHUB_URL", AppUrl);
            pipelinebuildparameters.Add("TARGET_BRANCH", pipelineHistory.branch_name);
            pipelinebuildparameters.Add("GIT_CREDENTIAL", "git-server-ssh");
            pipelinebuildparameters.Add("EMAIL_ADDRESS", "shashidharh@hexaware.com");
            pipelinebuildparameters.Add("BUILD_HISTORY_ID", "1");
            pipelinebuildparameters.Add("CALLBACK_URL", "/api/json");

            var buildResult = (pipelinebuildparameters?.Any() ?? false)
                ? runner.RunWithParameters("unique-tensai", pipelinebuildparameters)
                : runner.Run("unique-tensai");


           // if (!string.Equals(buildResult?.Result, "SUCCESS"))
             //   throw new ApplicationException($"Build #{buildResult?.Number} Failed!");

            Console.WriteLine($"Build #{buildResult?.Number} completed successfully.");
            Console.WriteLine($"Report: {buildResult?.Url}");
            var dt = new DateTime(1970, 1, 1, 0, 0, 0, 0).AddSeconds(Math.Round(Convert.ToInt64(buildResult.TimeStamp) / 1000d)).ToLocalTime();
            pipelineHistory.job_status = buildResult?.Result;
            pipelineHistory.build_number = (int)buildResult?.Number;


            _context.pipeline_history.Add(pipelineHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPipelineHistory", new { id = pipelineHistory.id }, pipelineHistory);
        }

     

        // DELETE: api/PipelineHistory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePipelineHistory(int id)
        {
            if (_context.pipeline_history == null)
            {
                return NotFound();
            }
            var pipelineHistory = await _context.pipeline_history.FindAsync(id);
            if (pipelineHistory == null)
            {
                return NotFound();
            }

            _context.pipeline_history.Remove(pipelineHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PipelineHistoryExists(int id)
        {
            return (_context.pipeline_history?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
