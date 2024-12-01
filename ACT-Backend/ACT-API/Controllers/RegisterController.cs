using ACT.Business.DTO;
using ACT.Business.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ACT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterService _registerService;
        public RegisterController(IRegisterService registerService)
        {
            _registerService = registerService;
        }
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (registerDto.Password != registerDto.confirmPassword)
            {
                return BadRequest("Passwords do not match");
            }

            try
            {
                var result = await _registerService.RegisterUserAsync(registerDto);
                if (!result)
                {
                    return BadRequest("Registration failed");
                }
                return Ok("User registered successfully");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }
    }
}
