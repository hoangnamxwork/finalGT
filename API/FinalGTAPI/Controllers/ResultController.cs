using AutoMapper;
using FinalGTAPI.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalGTAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController : ControllerBase
    {
        private readonly FinalGTDbContext _context;
        private readonly IMapper _mapper;

        public ResultController(FinalGTDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("DTO")]
        public async Task<ActionResult<IEnumerable<Result>>> GetResultsDTO()
        {
            return Ok(_context.Results
                .Select(Result => _mapper.Map<ResultDTO>(Result)));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Result>> GetResult(int id) {
            var results = await _context.Results
                .AsNoTracking()
                .Where(q => q.UserID == id)
                .Select(x => new 
                {
                    SubjectID = x.SubjectID,
                    AvgScore = x.AvgScore,
                    highestScore = x.highestScore,
                    testMade = x.testMade
                }).Take(3)
                .ToListAsync();

            return Ok(results);
    }
    } 
}
