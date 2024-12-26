using ACT.Business.DTO;
using ACT.Business.Services;
using ACT.Business.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ACT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        private readonly ITokenService _tokenService;
        public ReservationController(IReservationService reservationService, ITokenService tokenService)
        {
            _reservationService = reservationService;
            _tokenService = tokenService;
        }
        [HttpGet]
        public async Task<IActionResult> GetReservation([FromQuery] string userId)
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
            var reservations = await _reservationService.GetReservationAsync();
            var reservationDtos = reservations.Select(reservation => new ReservationDto
            {
                ReservationId = reservation.ReservationId,
                UserId= reservation.UserId,
                CustomerId = reservation.CustomerId,
                FlightId = reservation.FlightId,
                ReservationDate = reservation.ReservationDate,
                TotalAmount = reservation.TotalAmount,
                Status = reservation.Status,
                PaymentId = reservation.PaymentId,
                UpdateDate = reservation.UpdateDate,

                // User bilgileri
                User = reservation.User == null ? null : new UserDto
                {
                    UserId = reservation.UserId,
                    FirstName = reservation.User.FirstName,
                    LastName = reservation.User.LastName,
                    Email = reservation.User.Email,
                    Phone = reservation.User.Phone
                },
                Flight = reservation.Flight == null ? null : new FlightDto
                {
                    FlightCode = reservation.Flight.FlightCode,
                    DepartureDate = reservation.Flight.DepartureDate,
                    ArrivalDate = reservation.Flight.ArrivalDate,
                    DepartureLocation = reservation.Flight.DepartureLocation,
                    ArrivalLocation = reservation.Flight.ArrivalLocation,
                    Price = reservation.Flight.Price,
                    AvailableSeats = reservation.Flight.AvailableSeats,
                    Airline = reservation.Flight.Airline,
                },

            }).ToList();

            return Ok(reservationDtos);
        }
        [HttpGet("{reservationId}")]
        public async Task<IActionResult> GetReservationById(int reservationId, [FromQuery] string userId)
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

            var reservation = await _reservationService.GetReservationByIdAsync(reservationId);
            if (reservation == null)
            {
                return NotFound("Reservation not found");
            }

            var reservationDto = new ReservationDto
            {
                ReservationId = reservation.ReservationId,
                UserId = reservation.UserId,
                CustomerId = reservation.CustomerId,
                FlightId = reservation.FlightId,
                ReservationDate = reservation.ReservationDate,
                TotalAmount = reservation.TotalAmount,
                Status = reservation.Status,
                PaymentId = reservation.PaymentId,
                UpdateDate = reservation.UpdateDate,

                User = reservation.User == null ? null : new UserDto
                {
                    UserId = reservation.UserId,
                    FirstName = reservation.User.FirstName,
                    LastName = reservation.User.LastName,
                    Email = reservation.User.Email,
                    Phone = reservation.User.Phone
                },
                Flight = reservation.Flight == null ? null : new FlightDto
                {
                    FlightCode = reservation.Flight.FlightCode,
                    DepartureDate = reservation.Flight.DepartureDate,
                    ArrivalDate = reservation.Flight.ArrivalDate,  
                    DepartureLocation = reservation.Flight.DepartureLocation,
                    ArrivalLocation = reservation.Flight.ArrivalLocation,
                    Price = reservation.Flight.Price,
                    AvailableSeats = reservation.Flight.AvailableSeats,
                    Airline = reservation.Flight.Airline,
                },
            };

            return Ok(reservationDto);
        }
        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] AddToReservationDto reservationDto, [FromQuery] string userId)
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
            if (reservationDto == null)
            {
                return BadRequest("Payment data is null");
            }

            try
            {
                var newCart = await _reservationService.AddToReservation(reservationDto);

                // Başarılı yanıt döndürülüyor
                return Ok(new { message = "Cart added successfully", cart = newCart });
            }
            catch (ArgumentException ex)
            {
                // ArgumentException durumunda uygun bir yanıt döndür
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                // Genel hata durumunda 500 döndür
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id, [FromQuery] string userId)
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

            try
            {
                var result = await _reservationService.DeletetReservation(id);
                if (!result)
                {
                    return NotFound($"Payment with ID {id} not found.");
                }
                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
