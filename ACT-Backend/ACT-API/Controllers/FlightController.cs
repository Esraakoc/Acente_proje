using ACT.Business.DTO;
using ACT.Business.Services.Interfaces;
using ACT.Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ACT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly IFlightService _flightService;
        private readonly ITokenService _tokenService;
        public FlightController(IFlightService flightService, ITokenService tokenService)
        {
            _flightService = flightService;
            _tokenService = tokenService;
        }
        [HttpGet]
        public async Task<IActionResult> GetCampaign([FromQuery] string userId)
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
            var flights = await _flightService.GetFlightsAsync();
            var flightDtos = flights.Select(flight => new FlightDto
            {
                FlightId = flight.FlightId,
                FlightCode = flight.FlightCode,
                DepartureDate = flight.DepartureDate,
                ArrivalDate = flight.ArrivalDate,
                DepartureLocation = flight.DepartureLocation,
                ArrivalLocation = flight.ArrivalLocation,
                Price = flight.Price,
                AvailableSeats = flight.AvailableSeats,
                CreatedDate = flight.CreatedDate,
                UpdateAt = flight.UpdateAt,
                Airline = flight.Airline,
            }).ToList();
            return Ok(flightDtos);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ActFlight>> GetFlightById(int id, [FromQuery] string userId)
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
            var flight = await _flightService.GetFlightByIdS(id);
            if (flight == null)
            {
                return NotFound();
            }
            return Ok(flight);
        }
        [HttpGet("search")]
        public async Task<IActionResult> SearchFlights([FromQuery] string departureLocation, [FromQuery] string arrivalLocation, [FromQuery] DateTime departureDate, [FromQuery] string userId)
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
            if (string.IsNullOrEmpty(departureLocation) || string.IsNullOrEmpty(arrivalLocation))
            {
                return BadRequest("Lütfen tüm alanları doldurun.");
            }

            var flights = await _flightService.SearchFlights(departureLocation, arrivalLocation, departureDate);
            if (flights == null || !flights.Any())
            {
                return NotFound("Uygun uçuş bulunamadı.");
            }

            return Ok(flights);
        }
    }
}
