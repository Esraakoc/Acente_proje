using ACT.Business.DTO;
using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services.Interfaces
{
    public interface ILoginService
    {
        Task<ActUser?> LoginAsync(LoginDto loginDto);
    }
}
