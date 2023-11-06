
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalGTAPI.Data;
using System.Linq;
using FinalGTAPI.DTO;
using AutoMapper;
using System.Runtime.CompilerServices;
using FinalGTAPI.DTOs;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using FinalGTAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace FinalGTAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly FinalGTDbContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public QuizController(FinalGTDbContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext!.User
            .FindFirstValue(ClaimTypes.NameIdentifier)!);

        // GET: api/Quiz
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizes()
        {
            if (_context.Quizes == null)
            {
                return NotFound();
            }
            return await _context.Quizes.ToListAsync();
        }

        // GET: api/Quiz/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Quiz>> Get(int id)
        {
            if (_context.Quizes == null)
            {
                return NotFound();
            }
            var quizModel = await _context.Quizes.FindAsync(id);

            if (quizModel == null)
            {
                return NotFound();
            }

            return quizModel;
        }


        //GET: quizID

        [HttpGet("GetQuiz/{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<int>> GetQuiz(int id)
        {
            if (_context.Quizes == null)
            {
                return NotFound();
            }
            var quizID = await _context.Quizes.FindAsync(id);

            if (quizID == null)
            {
                return NotFound();
            }

            return id;

        }


        //GET RANDOM QUIZ

        [HttpGet("RandomQuiz")]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetRandomQuiz(string Subject)
        {
            if (string.IsNullOrEmpty(Subject))
            {
                return BadRequest("Subject is required.");
            }

            var RandomQuiz = await (_context.Quizes.Select(x => new
            {
                QuizId = x.QuizID,
                QuizContent = x.QuizContent,
                Options = new string[] {x.Option1, x.Option2, x.Option3, x.Option4
}
            }).OrderBy(y => Guid.NewGuid())
                .Take(10)
                ).ToListAsync();
            return Ok(RandomQuiz);
        }


        //GET: RANDOM SUBJECT QUIZ

        [HttpGet("RandomSubjectQuiz/{id}")]
        [Authorize(Roles = "Student")]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetRandomSubjectQuiz(int id)
        {
            if (_context.Quizes == null)
            {
                return NotFound();
            }

            var Quiz = await _context.Quizes
                .AsNoTracking()
                .Where(q => q.SubjectID == id)
                .Include(q => q.Subject)
                .Select(x => new
                {
                    QuizId = x.QuizID,
                    QuizContent = x.QuizContent,
                    Options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4
                },
                    Answer = x.Answer
                }).OrderBy(y => Guid.NewGuid()).Take(3)
                .ToListAsync();

            return Ok(Quiz);

        }

        /*
        //Post Score
        [HttpPost("PostScore")]
        public async Task<ActionResult<TestResult>> PostTestResult([FromBody] TestResult testResult, int userID, int subjectID)
        {
            if (_context.TestResults == null)
            {
                return Problem("Entity set 'FinalGTDbContext.TestResults'  is null.");
            }

            testResult.UserID = userID;
            testResult.SubjectID = subjectID;

            _context.TestResults.Add(testResult);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTestResult", new { id = testResult.TestID }, testResult);
        }
        */
        // PUT: api/Quiz/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutQuizModel(int id, Quiz quizModel)
        {
            if (id != quizModel.QuizID)
            {
                return BadRequest();
            }

            _context.Entry(quizModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizModelExists(id))
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

        // POST: api/Quiz
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Quiz>> PostQuizModel(Quiz quizModel)
        {
            if (_context.Quizes == null)
            {
                return Problem("Entity set 'FinalGTDbContext.Quizes'  is null.");
            }
            _context.Quizes.Add(quizModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuizModel", new { id = quizModel.QuizID }, quizModel);
        }

        //PostTestResult
        
        [HttpPost("PostTestResult")]
        [Authorize(Roles = "Student")]
        public async Task<ActionResult<TestResult>> PostTestResult([FromBody] TestResultDTO newTestResultDTO)
        {
            if (_context.TestResults == null)
            {
                return Problem("Entity set 'FinalGTDbContext.TestResults'  is null.");
            }
            var newTestResult = _mapper.Map<TestResult>(newTestResultDTO);
            var user = await _context.Users.FirstOrDefaultAsync(c => c.UserID == int.Parse(_httpContextAccessor.HttpContext!.User
                            .FindFirstValue(ClaimTypes.NameIdentifier)));


            var subject = await _context.Subjects
                .FirstOrDefaultAsync(c => c.SubjectID == newTestResult.SubjectID);

            var testResult = new TestResult
            {
                TestScore = newTestResult.TestScore,
                SubjectID = subject.SubjectID,
                UserID = user.UserID
            };
            
            _context.TestResults.Add(testResult);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(PostTestResult), new { id = testResult.TestID }, testResult);
        }
    




    // DELETE: api/Quiz/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteQuizModel(int id)
        {
            if (_context.Quizes == null)
            {
                return NotFound();
            }
            var quizModel = await _context.Quizes.FindAsync(id);
            if (quizModel == null)
            {
                return NotFound();
            }

            _context.Quizes.Remove(quizModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuizModelExists(int id)
        {
            return (_context.Quizes?.Any(e => e.QuizID == id)).GetValueOrDefault();
        }

        //DTO

        [HttpGet("DTO")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizesDTO()
        {
            return Ok(_context.Quizes.Select(quiz => _mapper.Map<QuizDTO>(quiz)));
        }

        [HttpPost("DTO")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Quiz>> PostQuiz(QuizDTO newQuiz)
        {
            var subject = await _context.Subjects
                .FirstOrDefaultAsync(c => c.SubjectID == newQuiz.SubjectID);
            var quiz = new Quiz
            {
                QuizContent = newQuiz.QuizContent,
                Option1 = newQuiz.Option1,
                Option2 = newQuiz.Option2,
                Option3 = newQuiz.Option3,
                Option4 = newQuiz.Option4,
                Answer = newQuiz.Answer,
                SubjectID = subject.SubjectID
            };
            _context.Quizes.Add(quiz);
            await _context.SaveChangesAsync();
            _mapper.Map<Quiz>(quiz);
            return CreatedAtAction(nameof(PostQuiz), new { id = newQuiz.QuizID }, newQuiz);
        }


        [HttpPut("DTO/{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<List<Quiz>>> PutQuiz(int id, QuizDTO updatedQuiz)
        {
            var quiz = await _context.Quizes
                .Include(c => c.Subject)
                .FirstOrDefaultAsync(c => c.SubjectID == updatedQuiz.SubjectID);

            quiz.QuizContent = updatedQuiz.QuizContent;
            quiz.Option1 = updatedQuiz.Option1;
            quiz.Option2 = updatedQuiz.Option2;
            quiz.Option3 = updatedQuiz.Option3;
            quiz.Option4 = updatedQuiz.Option4;
            quiz.Answer = updatedQuiz.Answer;
            quiz.SubjectID = updatedQuiz.SubjectID;

            await _context.SaveChangesAsync();

            return Ok(quiz);
        }
    }


}
