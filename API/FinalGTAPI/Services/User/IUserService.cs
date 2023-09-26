using FinalGTAPI.Models;

namespace FinalGTAPI.Services.User
{
    public interface IUserService
    {
        //GetAllUsers
        Task<List<UserModel>> GetAllUsers();

        //Add Users
        Task<List<UserModel>> AddUser(UserModel user);

        //Update Users
        Task<List<UserModel>?> UpdateUser(int id, UserModel user);

        //Delete Users
        Task<List<UserModel>?> DeleteUser(int id);
    }
}