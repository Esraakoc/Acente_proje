using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ACT.Business.Services.Interfaces;
using ACT.Business.DTO;
using ACT.Business.Services;

namespace ACT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        private readonly ITokenService _tokenService;
        public LoginController(ILoginService loginService, ITokenService tokenService)
        {
            _loginService = loginService;
            _tokenService = tokenService;
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _loginService.LoginAsync(loginDto);
            if (user == null)
            {
                return Unauthorized("Invalid user credentials");
            }

            var token = _tokenService.GeneratePasswordResetToken(user);
            return Ok(new
            {
                Token = token,
                ExpiresIn = 3600 * 24
            });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout( string token)
        {
            if(string.IsNullOrEmpty(token))
            {
                return BadRequest("Token is required");
            }
            await TokenService.RevokeTokenAsync(token);
            return Ok("Token has been revoked successfully.");
        }
    }
}

