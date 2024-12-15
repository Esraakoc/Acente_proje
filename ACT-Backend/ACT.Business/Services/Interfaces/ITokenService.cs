using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services.Interfaces
{
    public interface ITokenService
    {
        string GeneratePasswordResetToken(ActUser user);
        Task<ActUser> GetUserByResetTokenAsync(string token);
        bool ValidateToken(string token, out string userId);
    }
}
