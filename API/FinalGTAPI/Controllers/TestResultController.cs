using AutoMapper;
using FinalGTAPI.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalGTAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestResultController : ControllerBase
    {
        private readonly FinalGTDbContext _context;
        private readonly IMapper _mapper;

        public TestResultController(FinalGTDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("DTO")]
        public async Task<ActionResult<IEnumerable<TestResult>>> GetTestResultsDTO()
        {
            return Ok(_context.TestResults
                .Select(testResult => _mapper.Map<TestResultDTO>(testResult)));
        }

        [HttpGet("DTO/{id}")]
        public async Task<ActionResult<IEnumerable<TestResult>>> GetTestResult(int id)
        {
            var testResultList = await _context
                .TestResults
                .AsNoTracking()
                .Where(q => q.UserID == id).ToListAsync();

            return testResultList;
        }
        /*
        [HttpGet("Fullname/{id}")]

        public async Task<ActionResult> GetTestResultUserName(int id)
        {

            var getName = await _context.Users.
                FirstOrDefaultAsync(x => x.UserID == id);
            var FullName = $"{getName.LastName} {getName.FirstName}";

            return Ok(FullName);
        }*/
    }
}

