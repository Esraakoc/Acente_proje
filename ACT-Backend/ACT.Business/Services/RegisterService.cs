using ACT.Business.DTO;
using ACT.Business.Services.Interfaces;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ACT.DataAccess.Repositories.Interfaces;
using ACT.DataAccess.Repositories;
using ACT.Entity.Models;

namespace ACT.Business.Services
{
    public class RegisterService : IRegisterService
    {
        private readonly IRegisterRepository _registerRepository;
        public RegisterService(IRegisterRepository registerRepository)
        {
            _registerRepository = registerRepository;
        }
        public async Task<bool> RegisterUserAsync(RegisterDto registerDto)
        {

            if (string.IsNullOrWhiteSpace(registerDto.UserId) ||
                string.IsNullOrWhiteSpace(registerDto.Email) ||
                string.IsNullOrWhiteSpace(registerDto.Password))
            {
                throw new ArgumentException("UserId, Email, and Password are required.");
            }

            var existingUser = await _registerRepository.GetUserByUserIdOrEmailAsync(registerDto.UserId, registerDto.Email);
            if (existingUser != null)
            {
                throw new ArgumentException("A user with this UserId or Email already exists.");
            }

            var user = new ActUser
            {
                UserId = registerDto.UserId,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                Password = registerDto.Password,
                Phone = registerDto.Phone,
            };

            return await _registerRepository.RegisterUserAsync(user);
        }
    }
}
