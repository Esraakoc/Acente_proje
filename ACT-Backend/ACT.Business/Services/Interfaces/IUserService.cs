using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ACT.Entity.Models;

namespace ACT.Business.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<ActUser>> GetUsersAsync();
        Task<ActUser> GetUserByIdAsync(string id);
    }
}
