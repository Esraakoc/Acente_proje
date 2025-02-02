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
    public class CartController : ControllerBase
    {

        private readonly ICartService _cartService;
        private readonly ITokenService _tokenService;
        public CartController(ICartService cartService, ITokenService tokenService)
        {
            _cartService = cartService;
            _tokenService = tokenService;
        }
        [HttpGet]
        public async Task<IActionResult> GetCart([FromQuery] string userId)
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

            var carts = await _cartService.GetCartAsync();
            var cartDtos = carts.Select(cart => new CartDto
            {
                CartId = cart.CartId,
                UserId = cart.UserId,
                FlightId = cart.FlightId,
                Quantity = cart.Quantity,
                AddedAt = cart.AddedAt,

       
                User = new UserDto
                {
                    UserId = cart.User.UserId,
                    FirstName = cart.User.FirstName,
                    LastName = cart.User.LastName,
                    Email = cart.User.Email,
                    Phone = cart.User.Phone
                },

     
                Flight = new FlightDto
                {
                    FlightId = cart.Flight.FlightId,
                    FlightCode = cart.Flight.FlightCode,
                    DepartureLocation = cart.Flight.DepartureLocation,
                    ArrivalLocation = cart.Flight.ArrivalLocation,
                    DepartureDate = cart.Flight.DepartureDate,
                    ArrivalDate = cart.Flight.ArrivalDate,
                    Price = cart.Flight.Price,
                    AvailableSeats = cart.Flight.AvailableSeats,
                    CreatedDate = cart.Flight.CreatedDate,
                    UpdateAt =  cart.Flight.UpdateAt,
                    Airline = cart.Flight.Airline
                }
            }).ToList();

            return Ok(cartDtos);
        }
        [HttpGet("{user}")]
        public async Task<ActionResult<CartDto>> GetCartById(string user, [FromQuery] string userId)
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

            var carts = await _cartService.GetCartByIdS(userId);

            if (carts == null)
            {
                return NotFound();
            }

      
            var cartDtos = carts.Select(cart => new CartDto
            {
                CartId = cart.CartId,
                UserId = cart.UserId,
                FlightId = cart.FlightId,
                Quantity = cart.Quantity,
                AddedAt = cart.AddedAt,

             
                User = cart.User != null ? new UserDto
                {
                    UserId = cart.User.UserId,
                    FirstName = cart.User.FirstName,
                    LastName = cart.User.LastName,
                    Email = cart.User.Email,
                    Phone = cart.User.Phone
                } : null,

     
                Flight = cart.Flight != null ? new FlightDto
                {
                    FlightId = cart.Flight.FlightId,
                    FlightCode = cart.Flight.FlightCode,
                    DepartureLocation = cart.Flight.DepartureLocation,
                    ArrivalLocation = cart.Flight.ArrivalLocation,
                    DepartureDate = cart.Flight.DepartureDate,
                    ArrivalDate = cart.Flight.ArrivalDate,
                    Price = cart.Flight.Price,
                    Airline = cart.Flight.Airline
                } : null
            }).ToList();

            return Ok(cartDtos);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id, [FromQuery] string userId)
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
                await _cartService.DeleteCart(id);
                return NoContent(); 
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message); 
            }
        }
        [HttpDelete("delete/{user}")]
        public async Task<IActionResult> DeleteUserCart(string user, [FromQuery] string userId)
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
                await _cartService.DeleteUserCart(user);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message); 
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDto cartDto, [FromQuery] string userId)
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
                var newCart = await _cartService.AddToCart(cartDto);

          
                return Ok(new { message = "Cart added successfully", cart = newCart });
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
