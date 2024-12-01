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
    public class LoginRepository : ILoginRepository
    {
        private readonly AppDbContext _appDbContext;
        public LoginRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<ActUser> GetUserByIdAsync(string userId)
        {
            var user = await _appDbContext.ActUsers.FirstOrDefaultAsync(u => u.UserId == userId)
                         ?? throw new Exception($"User with ID {userId} not found");
            return user;
        }
    }
}
