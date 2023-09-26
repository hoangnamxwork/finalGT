using FinalGTAPI.Data;
using FinalGTAPI.Models;
using FinalGTAPI.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace FinalGTAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly FinalGTDbContext _authContext;
        private readonly IUserService _userService;

        public AuthController(FinalGTDbContext authContext, IUserService userService)
        {
            _authContext = authContext;
            _userService = userService;
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp([FromBody] UserModel userObj)
        {
            //Check null
            if (userObj == null)
            {
                return BadRequest();
            }

            //Check Username
            if (await CheckUsernameExistAsync(userObj.UserName))
                return BadRequest(new { message = "Username already exist!" });

            //Check Password
            var pass = CheckPassword(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass.ToString() });
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new { message = "Sign Up Complete!" });
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn([FromBody] UserModel accountObj)
        {
            if (accountObj == null)
            {
                return BadRequest();
            }

            var auth = await _authContext.Users.FirstOrDefaultAsync(
                x => x.UserName == accountObj.UserName
            );
            if (auth == null)
            {
                return NotFound(new { message = "User not found!" });
            }

            return Ok(new
            {
                message = "You are logged in!"
            });
        }

        private Task<bool> CheckUsernameExistAsync(string username) =>
            _authContext.Users.AnyAsync(x => x.UserName == username);

        private string CheckPassword(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
            {
                sb.Append("Mininum password strength is 8!" + Environment.NewLine);
            }

            return sb.ToString();
        }

    }
}
