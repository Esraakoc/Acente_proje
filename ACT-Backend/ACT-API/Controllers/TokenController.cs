using ACT.Business.Services.Interfaces;
using ACT.Business.DTO;
using Microsoft.AspNetCore.Mvc;
using ACT.Entity.Models;

namespace ACT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        //private readonly ITokenService _tokenService;

        //public TokenController(ITokenService tokenService)
        //{
        //    _tokenService = tokenService;
        //}

        //[HttpPost("generate")]
        //public IActionResult GenerateToken([FromBody] ActUser user)
        //{
        //    try
        //    {
        //        var token = _tokenService.GenerateToken(user);
        //        return Ok(new { token });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "An error occurred while generating token.", details = ex.Message });
        //    }
        //}

        //[HttpPost("validate")]
        //public async Task<IActionResult> ValidateToken([FromBody] string token)
        //{
        //    try
        //    {
        //        var user = await _tokenService.GetUserByTokenAsync(token);
        //        return Ok(user);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Unauthorized(new { message = "Invalid token.", details = ex.Message });
        //    }
        //}

        //[HttpPost("revoke")]
        //public async Task<IActionResult> RevokeToken([FromBody] string token)
        //{
        //    try
        //    {
        //        await _tokenService.RevokeTokenAsync(token);
        //        return Ok(new { message = "Token has been revoked successfully." });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "An error occurred while revoking token.", details = ex.Message });
        //    }
        //}
    }
}