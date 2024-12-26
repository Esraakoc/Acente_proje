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
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly ICustomerService _customerService;
        private readonly ITokenService _tokenService;
        public PaymentController(IPaymentService paymentService, ITokenService tokenService, ICustomerService customerService)
        {
            _paymentService = paymentService;
            _tokenService = tokenService;
            _customerService = customerService;
        }
        [HttpGet]
        public async Task<IActionResult> GetPayment([FromQuery] string userId)
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
            var payments = await _paymentService.GetPaymentsAsync();
            var paymentDtos = payments.Select(payment => new PaymentDto
            {
                PaymentId = payment.PaymentId,
                UserId = payment.UserId,
                CustomerId = payment.CustomerId,
                PaymentDate = payment.PaymentDate,
                PaymentAmount = payment.PaymentAmount,
                PaymentStatus = payment.PaymentStatus,
                CreditCardNo = payment.CreditCardNo,
                ExpiryDate = payment.ExpiryDate,
                CVV = payment.CVV,

                // User bilgileri
                User = payment.User == null ? null :new UserDto
                {
                    UserId = payment.UserId,
                    FirstName = payment.User.FirstName,
                    LastName = payment.User.LastName,
                    Email = payment.User.Email,
                    Phone = payment.User.Phone
                },

            }).ToList();

            return Ok(paymentDtos);
        }
        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] AddToPaymentDto paymentDto, [FromQuery] string userId)
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

            if (paymentDto == null)
            {
                return BadRequest("Payment data is null");
            }

            try
            {
                // Müşteri kontrolü ve oluşturma
                var customer = await _customerService.GetOrCreateCustomerAsync(
                    paymentDto.FirstName,
                    paymentDto.LastName,
                    paymentDto.Phone
                );

                // PaymentDto'ya müşteri ID'sini ekle
                paymentDto.CustomerId = customer.CustomerId;

                // Ödeme oluştur
                var newPayment = await _paymentService.CreatePaymentAsync(paymentDto);

                return Ok(new { message = "Payment created successfully", payment = newPayment });
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id, [FromQuery] string userId)
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
                var result = await _paymentService.DeletePaymentAsync(id);
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
