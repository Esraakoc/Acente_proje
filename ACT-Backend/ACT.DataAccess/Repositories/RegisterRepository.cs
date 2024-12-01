using ACT.DataAccess.Repositories.Interfaces;
using ACT.Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories
{
    public class RegisterRepository : IRegisterRepository
    {
        private readonly AppDbContext _appDbContext;

        public RegisterRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<bool> RegisterUserAsync(ActUser user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            try
            {
                _appDbContext.ActUsers.Add(user);
                await _appDbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
        public async Task<ActUser?> GetUserByUserIdOrEmailAsync(string userId, string email)
        {
            return await _appDbContext.ActUsers
                         .FirstOrDefaultAsync(u => u.UserId == userId || u.Email == email);
        }
    }
}
