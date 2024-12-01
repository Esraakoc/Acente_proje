using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories.Interfaces
{
    public interface ILoginRepository
    {
        Task<ActUser> GetUserByIdAsync(string userId);
    }
}
