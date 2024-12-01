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
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _appDbContext;

        public UserRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public IQueryable<ActUser> StatusAll(bool trackChanges)
        {
            return trackChanges ? _appDbContext.ActUsers : _appDbContext.ActUsers.AsNoTracking();
        }
        public async Task<IEnumerable<ActUser>> GetUsersAsync()
        {
            return await StatusAll(trackChanges: false).ToListAsync();
        }
        public async Task<ActUser> GetUserAsync(string id)
        {
            var user = await StatusAll(trackChanges: false).FirstOrDefaultAsync(e => e.UserId == id);
            if (user == null)
            {
                throw new Exception($"User with ID {id} not found.");
            }
            return user;
        }
        public async Task<bool> SaveAsync()
        {
            try
            {
                var saved = await _appDbContext.SaveChangesAsync();
                return saved > 0;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("An error occurred while saving changes.", ex);
            }
        }
    }
}
