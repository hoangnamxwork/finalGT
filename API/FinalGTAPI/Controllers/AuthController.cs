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
        private readonly FinalGTDbContext _context;


        public AuthController(FinalGTDbContext context)
        {
           _context = context;

        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp([FromBody] User newUser)
        {
            

            //Check null
            if (newUser == null)
            {
                return BadRequest();
            }
            //Check Username exist
            if (await CheckUsernameExistAsync(newUser.UserName))
                return BadRequest(new { message = "Username already exist!" });

            //Check email exist
            if (await CheckEmailExistAsync(newUser.Email))
                return BadRequest(new { Message = "Email Already Exist" });


            await _context.Users.AddAsync(newUser);
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

            
            return Ok(new { message = "Sign Up Complete!" });
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn([FromBody] User accountObj)
        {
            if (accountObj == null)
            {
                return BadRequest();
            }

            var auth = await _context.Users.FirstOrDefaultAsync(
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
            _context.Users.AnyAsync(x => x.UserName == username);

     

        private Task<bool> CheckEmailExistAsync(string? email)
            => _context.Users.AnyAsync(x => x.Email == email);


        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("finalGTverysecretkey");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim("FirstName", user.FirstName ),
                new Claim("LastName", user.LastName),
                new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
                new Claim("Role", user.Role),
                new Claim("Email", user.Email),
                new Claim("UserName", user.UserName),
                new Claim("Password", user.Password)
                
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
