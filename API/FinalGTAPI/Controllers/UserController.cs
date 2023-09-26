using FinalGTAPI.Data;
using FinalGTAPI.Models;
using FinalGTAPI.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalGTAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService? _userService;
        private readonly FinalGTDbContext _context;

        public UserController(IUserService userService, FinalGTDbContext context)
        {
            _userService = userService;
            _context = context;

        }

        //User

        [HttpGet("GetAllUsers")]

        public async Task<ActionResult<List<UserModel>>> GetAllUsers()
        {
            return await _userService.GetAllUsers();
        }

        [HttpPost("AddUser")]

        public async Task<ActionResult<List<UserModel>>> AddUser(UserModel user)
        {
            var result = await _userService.AddUser(user);
            return Ok(user);
        }

        [HttpDelete("DeleteUser{id}")]

        public async Task<ActionResult<List<UserModel>>> DeleteUser(int id)
        {
            var delete = await _userService.DeleteUser(id);
            if (delete is null)
            {
                return NotFound("User not found");
            }
            return Ok(delete);
        }

        [HttpPut("UpdateUser{id}")]

        public async Task<ActionResult<List<UserModel>>> UpdateUser(int id, UserModel user)
        {
            var update = await _userService.UpdateUser(id, user);
            if (update is null)
            {
                return NotFound("User not found!");

            }
            return Ok(update);
        }

        //Find user ID

        [HttpGet("{id}")]
        public IActionResult GetUserID(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserID == id);
            if (user == null)
            {
                return NotFound("User not found!");
            }
            return Ok(user);
        }
    }
}

