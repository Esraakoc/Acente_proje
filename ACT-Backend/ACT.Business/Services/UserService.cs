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
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository) 
        {
            _userRepository = userRepository;
        }
        public async Task<IEnumerable<ActUser>> GetUsersAsync()
        {
            return await _userRepository.GetUsersAsync();
        }
        public async Task<ActUser> GetUserByIdAsync(string id)
        {
            return await _userRepository.GetUserAsync(id);
        }
    }
}
