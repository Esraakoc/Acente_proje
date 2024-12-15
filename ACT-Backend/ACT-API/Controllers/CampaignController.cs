using ACT.Business.DTO;
using ACT.Business.Services;
using ACT.Business.Services.Interfaces;
using ACT.Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ACT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignController : ControllerBase
    {
        private readonly ICampaignService _campaignService;
        private readonly ITokenService _tokenService;
        public CampaignController(ICampaignService campaignService, ITokenService tokenService)
        {
            _campaignService = campaignService;
            _tokenService = tokenService;
        }
        [HttpGet]
        public async Task<IActionResult> GetCampaign( [FromQuery] string userId)
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return Unauthorized("Authorization header missing");
            }
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "").Trim();
            if (string.IsNullOrEmpty(token) || !_tokenService.ValidateToken(token, out var userIdFromToken))
            {
                return Unauthorized("Invalid or missing token");
            }
            if (userId != userIdFromToken)
            {
                return Forbid("Token does not match the requested user.");
            }
            var campaigns = await _campaignService.GetCampaignsAsync();
            var campaignDtos = campaigns.Select(campaign => new CampaignDto
            {
                CampaignId = campaign.CampaignId,
                Title = campaign.Title,
                Description = campaign.Description,
                DiscountPercentage = campaign.DiscountPercentage,
                StartDate = campaign.StartDate,
                EndDate = campaign.EndDate
            }).ToList();
            return Ok(campaignDtos);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ActCampaign>> GetCampaignById(int id,[FromQuery]string userId)
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return Unauthorized("Authorization header missing");
            }
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "").Trim();
            if (string.IsNullOrEmpty(token) || !_tokenService.ValidateToken(token, out var userIdFromToken))
            {
                return Unauthorized("Invalid or missing token");
            }
            if (userId != userIdFromToken)
            {
                return Forbid("Token does not match the requested user.");
            }
            var campaign = await _campaignService.GetCampaignByIdS(id);
            if (campaign == null)
            {
                return NotFound();
            }
            return Ok(campaign);
        }
    }
}
