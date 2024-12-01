using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<ActUser>> GetUsersAsync();
        Task<ActUser> GetUserAsync(string id);
        Task<bool> SaveAsync();
    }
}
