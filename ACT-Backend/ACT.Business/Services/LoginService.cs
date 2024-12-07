using ACT.Business.DTO;
using ACT.Business.Services.Interfaces;
using ACT.DataAccess.Repositories.Interfaces;
using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRepository;
        public LoginService(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }
        public async Task<ActUser?> LoginAsync(LoginDto loginDto)
        {
            if (string.IsNullOrEmpty(loginDto.UserId) || string.IsNullOrEmpty(loginDto.Password))
            {
                throw new ArgumentException("User ID and Password cannot be empty.");
            }

            var user = await _loginRepository.GetUserByIdAsync(loginDto.UserId);
            if (user == null)
            {
                throw new UnauthorizedAccessException("User not found.");
            }

            // Şifreyi doğrula
            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                throw new UnauthorizedAccessException("Invalid password.");
            }

            // Giriş başarılı, kullanıcıyı döndür
            return user;
        }
    }
}
