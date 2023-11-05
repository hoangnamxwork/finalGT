using AutoMapper;
using FinalGTAPI.Data;
using FinalGTAPI.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalGTAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly FinalGTDbContext _context;
        private readonly IMapper _mapper;

        public SubjectController(FinalGTDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("DTO")]
        public async Task<ActionResult<IEnumerable<Subject>>> GetQuizesDTO()
        {
            return Ok(_context.Subjects.Select(subject => _mapper.Map<SubjectDTO>(subject)));
        }
    }
}
