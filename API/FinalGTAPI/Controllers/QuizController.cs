
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
using System.Net.WebSockets;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.IO;
using System.Security.Cryptography.Pkcs;

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


        /*
            //Upload Image
        private bool IsImage(IFormFile file)
            {
                var allowedImageTypes = new[] { "image/jpeg", "image/png", "image/gif" };

                return file != null && allowedImageTypes.Contains(file.ContentType);
            }
            private async Task<QuizFile> SaveFileAsync(IFormFile newFile)
            {
                QuizFile file = new QuizFile();

                var FileDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "quiz", "img");

                if (newFile != null && IsImage(newFile))
                {
                    if (!Directory.Exists(FileDirectory))
                        Directory.CreateDirectory(FileDirectory);

                    var FileName = DateTime.UtcNow.Ticks.ToString() + Path.GetExtension(newFile.FileName);
                    var path = Path.Combine(FileDirectory, FileName);

                    file.FileName = FileName;
                    file.FilePath = path;
                    file.MimeType = newFile.ContentType;
                    file.FileExtension = Path.GetExtension(newFile.FileName);
                    file.fileCreatedAt = DateTime.UtcNow;
                    file.fileUpdatedAt = file.fileCreatedAt;


                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        newFile.CopyTo(stream);
                    }
                    file.fileData = stream.ToArray();
                    _context.QuizFiles.Add(file);
                    await _context.SaveChangesAsync();
                    return file;
                } else {
                    return null;
                }

            }
        */
        private bool QuizModelExists(int id)
        {
            return (_context.Quizes?.Any(e => e.QuizID == id)).GetValueOrDefault();
        }
        private Task<bool> CheckQuizContentExistAsync(string quizContent) =>
            _context.Quizes.AnyAsync(x => x.QuizContent == quizContent);

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
                    Answer = x.Answer,
                }).OrderBy(y => Guid.NewGuid()).Take(40)
                .ToListAsync();

            return Ok(Quiz);

        }

        [HttpGet("GetPomodoroQuiz/{id}")]

        public async Task<ActionResult<IEnumerable<Quiz>>> GetPomodoroQuiz(int id)
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
                    Answer = x.Answer,
                }).OrderBy(y => Guid.NewGuid()).Take(10)
                .ToListAsync();

            return Ok(Quiz);

        }

        // PUT: api/Quiz/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> EditQuizModel(int id, Quiz quizModel)
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
        public async Task<ActionResult<Quiz>> AddQuizModel(Quiz quizModel)
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

        public async Task<ActionResult<TestResult>> PostTestResult([FromBody] TestResultDTO newTestResultDTO)
        {
            var newTestResult = _mapper.Map<TestResult>(newTestResultDTO);
            var result = await _context.Results
                .FirstOrDefaultAsync(c => c.UserID == newTestResult.UserID 
                && c.SubjectID == newTestResult.SubjectID);
            if (result.AvgScore == 0)
            {
                result.AvgScore =  newTestResult.TestScore;
            }
            if (result.highestScore == 0 || result.highestScore < newTestResult.TestScore)
            {
                result.highestScore = newTestResult.TestScore;
            }
            var oldTestMade = result.testMade;
            var newTestMade = result.testMade+1;
            var newAvgScore = (result.AvgScore * result.testMade)/newTestMade;
            result.AvgScore = newAvgScore;
            result.testMade++;
            newTestResult.DateTest = DateTime.UtcNow;

            _context.TestResults.Add(newTestResult);
            await _context.SaveChangesAsync();
            return CreatedAtAction
                (nameof(PostTestResult), new { id = newTestResult.TestID }, newTestResult);
        }
        


        // DELETE: api/Quiz/5
        [HttpDelete("{id}")]

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


        //DTO

        [HttpGet("DTO")]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizesDTO()
        {
            return Ok(_context.Quizes.Select(quiz => _mapper.Map<QuizDTO>(quiz)));
        }

        [HttpPost("DTO")]
        public async Task<ActionResult<Quiz>> AddQuiz(QuizDTO newQuiz)
        {
            /*var subject = await _context.Subjects
                .FirstOrDefaultAsync(c => c.SubjectID == newQuiz.SubjectID);
            var quizdiff = await _context.QuizDifficulties
                .FirstOrDefaultAsync(c => c.QuizDiffId == newQuiz.QuizDiffId);*/

            var quiz = new Quiz
            {
                QuizContent = newQuiz.QuizContent,
                SubjectID = newQuiz.SubjectID ?? 0,  
                QuizDiffId = newQuiz.QuizDiffId ?? 0,
                Option1 = newQuiz.Option1,
                Option2 = newQuiz.Option2,
                Option3 = newQuiz.Option3,
                Option4 = newQuiz.Option4,
                Answer = newQuiz.Answer ?? 0,
                quizCreatedAt = DateTime.UtcNow,
                quizUpdatedAt = DateTime.UtcNow, 
            };

            _context.Quizes.Add(quiz);
            await _context.SaveChangesAsync();
            _mapper.Map<Quiz>(quiz);
            return CreatedAtAction(nameof(AddQuiz), new { id = newQuiz.QuizID }, newQuiz);
        }

        [HttpPut("DTO/{id}")]
        public async Task<ActionResult<List<Quiz>>> PutQuiz(int id, QuizDTO updatedQuiz)
        {
            var quiz = await _context.Quizes.FindAsync(id);


            quiz.QuizContent = updatedQuiz.QuizContent;
            quiz.Option1 = updatedQuiz.Option1;
            quiz.Option2 = updatedQuiz.Option2;
            quiz.Option3 = updatedQuiz.Option3;
            quiz.Option4 = updatedQuiz.Option4;
            quiz.Answer = updatedQuiz.Answer ?? 0;
            quiz.QuizDiffId = updatedQuiz.QuizDiffId ?? 0;
            quiz.SubjectID = updatedQuiz.SubjectID ?? 0;

            await _context.SaveChangesAsync();

            return Ok(quiz);
        }

        /*

        //Post Quiz with File
        [HttpPost("File"), DisableRequestSizeLimit]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddQuizWithFile([FromForm] QuizDTO newQuiz)
        {
            
            var subject = await _context.Subjects
                .FirstOrDefaultAsync(c => c.SubjectID == newQuiz.SubjectID);
            var quizdiff = await _context.QuizDifficulties
                .FirstOrDefaultAsync(c => c.QuizDiffId == newQuiz.QuizDiffId);

            QuizFile newFile = await SaveFileAsync(newQuiz.quizFile);

            if (newFile == null) {
                return BadRequest("No file was selected");
            }
            else
            {
                var quiz = new Quiz
                {
                    Option1 = newQuiz.Option1,
                    Option2 = newQuiz.Option2,
                    Option3 = newQuiz.Option3,
                    Option4 = newQuiz.Option4,
                    Answer = newQuiz.Answer,
                    quizCreatedAt = DateTime.UtcNow,
                    quizUpdatedAt = DateTime.UtcNow,
                    QuizFileId = newFile.Id,
                    SubjectID = subject.SubjectID,
                    QuizDiffId = newQuiz.QuizDiffId
                };

                _context.Quizes.Add(quiz);
                await _context.SaveChangesAsync();
                _mapper.Map<Quiz>(quiz);
                return CreatedAtAction(nameof(AddQuizWithFile), new { id = quiz.QuizID }, newQuiz);
            }  
        }

        //Put Quiz with File
        [HttpPut("File/{id}"), DisableRequestSizeLimit]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> PutQuizWithFile(int id,[FromForm] QuizDTO editedQuiz)
        {
            if (id != editedQuiz.QuizID)
            {
                return BadRequest();
            }
            var quiz = await _context.Quizes
                .Include(c => c.Subject)
                .FirstOrDefaultAsync(c => c.SubjectID == editedQuiz.SubjectID);
             
            QuizFile newFile = await SaveFileAsync(editedQuiz.quizFile);

                quiz.QuizContent = editedQuiz.QuizContent;
                quiz.Option1 = editedQuiz.Option1;
                quiz.Option2 = editedQuiz.Option2;
                quiz.Option3 = editedQuiz.Option3;
                quiz.Option4 = editedQuiz.Option4;
                quiz.Answer = editedQuiz.Answer;
                quiz.QuizFileId = newFile.Id;
                quiz.QuizDiffId = editedQuiz.QuizDiffId;
                quiz.SubjectID = editedQuiz.SubjectID;
                quiz.quizUpdatedAt = DateTime.UtcNow;
                newFile.fileUpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                _mapper.Map<Quiz>(quiz);
                return Ok(quiz);
            
        }*/
    }


}
