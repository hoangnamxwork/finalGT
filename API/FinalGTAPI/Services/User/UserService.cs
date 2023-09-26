using FinalGTAPI.Data;
using FinalGTAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FinalGTAPI.Services.User
{
    public class UserService : IUserService
    {
        private readonly FinalGTDbContext _context;

        public UserService(FinalGTDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserModel>> AddUser(UserModel user)
        {

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return await _context.Users.ToListAsync();
        }

        public async Task<List<UserModel>?> DeleteUser(int id)
        {
            var delete = await _context.Users.FindAsync(id);
            if (delete == null)
                return null;

            _context.Users.Remove(delete);

            await _context.SaveChangesAsync();

            return await _context.Users.ToListAsync();
        }

        public async Task<List<UserModel>> GetAllUsers()
        {
            var list = await _context.Users.ToListAsync();
            return list;
        }


        public async Task<List<UserModel>?> UpdateUser(int id, UserModel user)
        {
            var update = await _context.Users.FindAsync(id);
            if (update == null)
            {
                return null;
            }

            update.UserName = user.UserName;
            update.Password = user.Password;
            update.FullName = user.FullName;
            update.Gender = user.Gender;
            update.Email = user.Email;
            update.PhoneNumber = user.PhoneNumber;
            await _context.SaveChangesAsync();
            return await _context.Users.ToListAsync();
        }


    }
}

