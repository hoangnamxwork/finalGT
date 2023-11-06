using FinalGTAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace FinalGTAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly FinalGTDbContext _authContext;


        public AuthController(FinalGTDbContext authContext)
        {
            _authContext = authContext;

        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp([FromBody] User userObj)
        {
            

            //Check null
            if (userObj == null)
            {
                return BadRequest();
            }

            //Check Username exist
            if (await CheckUsernameExistAsync(userObj.UserName))
                return BadRequest(new { message = "Username already exist!" });

            //Check email valid

            //Check email exist
            if (await CheckEmailExistAsync(userObj.Email))
                return BadRequest(new { Message = "Email Already Exist" });

            //Check Password
            var pass = CheckPassword(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass.ToString() });
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new { message = "Sign Up Complete!" });
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn([FromBody] User accountObj)
        {
            if (accountObj == null)
            {
                return BadRequest();
            }

            var auth = await _authContext.Users.FirstOrDefaultAsync(
                x => x.UserName == accountObj.UserName && x.Password == accountObj.Password
            );



            if (auth == null)
            {
                return NotFound(new { message = "User not found!" });
            }

            auth.Token = CreateJwt(auth);

            return Ok(new
            {
                Token = auth.Token,
                message = "You are logged in!"
            });
        }

        private Task<bool> CheckUsernameExistAsync(string username) =>
            _authContext.Users.AnyAsync(x => x.UserName == username);

     

        private Task<bool> CheckEmailExistAsync(string? email)
            => _authContext.Users.AnyAsync(x => x.Email == email);

        


        private string CheckPassword(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
            {
                sb.Append("Mininum password strength is 8!" + Environment.NewLine);
            }

            return sb.ToString();
        }

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("finalGTverysecretkey");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName),
                new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
                
            }); 
            var credentials = new SigningCredentials
                (new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
