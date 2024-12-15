using ACT.Business.Services.Interfaces;
using ACT.DataAccess;
using ACT.Entity.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ACT.Business.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;
        private readonly string? _secretKey;
        private readonly string? _issuer;
        private readonly string? _audience;
        private readonly int _expirationMinutes;

        private static readonly ConcurrentDictionary<string, DateTime> InvalidTokens = new ConcurrentDictionary<string, DateTime>();

        // Token temizleme mekanizması
        static TokenService()
        {
            Task.Run(async () =>
            {
                while (true)
                {
                    await Task.Delay(TimeSpan.FromHours(1)); // Her 1 saatte bir
                    var expiredTokens = InvalidTokens
                        .Where(t => t.Value.AddHours(6) < DateTime.UtcNow) // 6 saatten eski token'ları seç
                        .Select(t => t.Key).ToList();

                    foreach (var token in expiredTokens)
                    {
                        InvalidTokens.TryRemove(token, out _); // Geçersiz token'ı listeden kaldır
                    }
                }
            });
        }




        public TokenService(IConfiguration configuration, AppDbContext context)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _context = context ?? throw new ArgumentNullException(nameof(context));

            _secretKey = _configuration["JwtSettings:SecretKey"]
                         ?? throw new InvalidOperationException("JwtSettings:SecretKey is not configured.");
            _issuer = _configuration["JwtSettings:Issuer"]
                      ?? throw new InvalidOperationException("JwtSettings:Issuer is not configured.");
            _audience = _configuration["JwtSettings:Audience"]
                        ?? throw new InvalidOperationException("JwtSettings:Audience is not configured.");
            _expirationMinutes = int.TryParse(_configuration["JwtSettings:ExpirationMinutes"], out var minutes)
                ? minutes
                : throw new InvalidOperationException("JwtSettings:ExpirationMinutes is not configured or invalid.");
        }

        public string GeneratePasswordResetToken(ActUser user)
        {
            try
            {
                //JWT Handler ve (Secret Key) Tanımlamama
                var tokenHandler = new JwtSecurityTokenHandler();
                if (string.IsNullOrEmpty(_secretKey))
                {
                    throw new InvalidOperationException("Secret key is not configured.");
                }

                var key = Encoding.ASCII.GetBytes(_secretKey);
                //Token Tanımlayıcı Oluşturma
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                        new Claim(ClaimTypes.Email, user.Email),

                    }),
                    Expires = DateTime.UtcNow.AddMinutes(_expirationMinutes), //geçerlilik süresi
                   
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature) //güvenlik
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return tokenString;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to generate password reset token.", ex);
            }
        }

        // Reset Token ile kullanıcıyı bulma
        public async Task<ActUser> GetUserByResetTokenAsync(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_secretKey);

                if (!(tokenHandler.ReadToken(token) is JwtSecurityToken jwtToken))
                    throw new SecurityTokenException("Invalid token format.");

                if (jwtToken.ValidTo <= DateTime.UtcNow)
                    throw new SecurityTokenExpiredException("Token has expired.");

                var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    throw new SecurityTokenException("Invalid token claims.");

                var user = await _context.ActUsers.FirstOrDefaultAsync(u => u.UserId.ToString() == userId);
                return user ?? throw new InvalidOperationException("User not found.");
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error while processing the reset token.", ex);
            }
        }

        public static Task RevokeTokenAsync(string token)
        {
            InvalidTokens[token] = DateTime.UtcNow;
            return Task.CompletedTask;
        }
        public bool ValidateToken(string token, out string userId)
        {
            userId = null;
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_secretKey);

                var parameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
              
                    ValidateAudience = false,
                
                    ValidateLifetime = false,
                    ClockSkew = TimeSpan.Zero
                };


                var principal = tokenHandler.ValidateToken(token, parameters, out var validatedToken);
                if (validatedToken is JwtSecurityToken jwtToken && jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    userId = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                    return true;
                }
            }
            catch (Exception ex) 
            {
                // Token geçersizse false döner
                Console.WriteLine($"Token validation failed: {ex.Message}");
            }
            return false;
        }
    }
}
