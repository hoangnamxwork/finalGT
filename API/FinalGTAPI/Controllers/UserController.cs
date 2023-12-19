
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalGTAPI.Data;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure.Internal;
using AutoMapper;
using FinalGTAPI.DTO;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace FinalGTAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly FinalGTDbContext _context;
        private readonly IMapper _mapper;
        public UserController(FinalGTDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        // GET: api/User
        [HttpGet]

        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]

        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var userModel = await _context.Users.FirstOrDefaultAsync(x => x.UserID == id);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]

        public async Task<ActionResult<List<User>>> EditUser(int id, User updatedUser)
        {

            var user = await _context.Users.FindAsync(id);

            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.Email = updatedUser.Email;
            user.UserName = updatedUser.UserName;
            user.Password = updatedUser.Password;
            user.Role = updatedUser.Role;


            await _context.SaveChangesAsync();

            return Ok(user);
        }


        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]

        public async Task<ActionResult<User>> AddUser([FromBody] User userModel)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'FinalGTDbContext.Users'  is null.");
            }
            _context.Users.Add(userModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserModel", new { id = userModel.UserID }, userModel);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
 
        public async Task<IActionResult> DeleteUserModel(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var userModel = await _context.Users.FindAsync(id);
            if (userModel == null)
            {
                return NotFound();
            }

            _context.Users.Remove(userModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserModelExists(int id)
        {
            return (_context.Users?.Any(e => e.UserID == id)).GetValueOrDefault();
        }

        private Task<bool> CheckUsernameExistAsync(string username) =>
            _context.Users.AnyAsync(x => x.UserName == username);



        private Task<bool> CheckEmailExistAsync(string? email)
            => _context.Users.AnyAsync(x => x.Email == email);  

        ///DTOs
        /// 


        [HttpGet("DTO")]

        public async Task<ActionResult<IEnumerable<User>>> GetUsersDTO()
        {
            return Ok(_context.Users.Select(user => _mapper.Map<UserDTO>(user)));
        }

        [HttpGet("DTO/{id}")]

        public async Task<ActionResult<UserDTO>> GetUserDTO(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var userModel = await _context.Users.FirstOrDefaultAsync(x => x.UserID == id);
            var user = _mapper.Map<UserDTO>(userModel);
            if (userModel == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost("DTO")]

        public async Task<ActionResult<User>> AddUserDTO(User newUser)
        {
  
            //Check Username exist
            if (await CheckUsernameExistAsync(newUser.UserName))
                return BadRequest(new { message = "Username already exist!" });

            //Check email exist
            if (await CheckEmailExistAsync(newUser.Email))
                return BadRequest(new { Message = "Email Already Exist" });
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            int addedUserId = newUser.UserID;
            for (int i = 1; i <= 3; i++)
            {
                var newResult = new Result
                {
                    AvgScore = 0,
                    highestScore = 0,
                    testMade = 0,
                    SubjectID = i,
                    UserID = addedUserId,
                };
                await _context.Results.AddAsync(newResult);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("DTO/{id}")]
        public async Task<ActionResult<List<User>>> EditUserDTO(int id, UserDTO updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            //var userDTO = _mapper.Map<User>(user);

            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.Email = updatedUser.Email;
            user.UserName = updatedUser.UserName;
            user.Password = updatedUser.Password;
            user.Role = updatedUser.Role;

            await _context.SaveChangesAsync();

            return Ok(user);
        }

    }
}
