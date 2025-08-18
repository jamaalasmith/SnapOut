using api.Models;

namespace api.Services.Interfaces;

public interface IUserService
{
    List<User> GetAllUsers();
    User? GetUserById(int id);
    User CreateUser(object userData);
}