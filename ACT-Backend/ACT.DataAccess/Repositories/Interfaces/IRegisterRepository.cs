using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories.Interfaces
{
    public interface IRegisterRepository
    {
        Task<bool> RegisterUserAsync(ActUser user);
        Task<ActUser?> GetUserByUserIdOrEmailAsync(string userId, string email);
    }
}
