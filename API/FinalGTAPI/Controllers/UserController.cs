﻿
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
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<User>> GetUserModel(int id)
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
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<User>>> PutUserModel(int id, User updatedUser)
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
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<User>> PostUserModel([FromBody] User userModel)
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
        [Authorize(Roles = "Admin")]
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


        ///DTOs
        /// 


        [HttpGet("DTO")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersDTO()
        {
            return Ok(_context.Users.Select(user => _mapper.Map<UserDTO>(user)));
        }

        [HttpPost("DTO")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<UserDTO>>> PostUserDTO(UserDTO newUser)
        {
            var user = _mapper.Map<User>(newUser);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetUserModel", new { id = newUser.UserID }, newUser);
        }

        [HttpPut("DTO/{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<List<User>>> PutUserDTO(int id, UserDTO updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            var userDTO = _mapper.Map<User>(user);
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
