using ACT.Business.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services.Interfaces
{
    public interface IRegisterService
    {
        Task<bool> RegisterUserAsync(RegisterDto registerDto);
    }
}
