﻿using ACT.Business.Services.Interfaces;
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
                        new Claim("ResetToken", Guid.NewGuid().ToString())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(_expirationMinutes), //geçerlilik süresi
                    Issuer = _issuer,//tokenı kimin oluşturduğu
                    Audience = _audience, //kim için geçerli olduğu
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

        //token geçersiz kılmak amacıyla
        public async Task<ActUser> GetUserByResetTokenAsync(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                if (string.IsNullOrEmpty(_secretKey))
                {
                    throw new InvalidOperationException("Secret key is not configured.");
                }

                var key = Encoding.ASCII.GetBytes(_secretKey);

                if (tokenHandler.ReadToken(token) is JwtSecurityToken jwtToken)
                {
                    if (jwtToken.ValidTo <= DateTime.UtcNow)
                    {
                        throw new SecurityTokenExpiredException("Token has expired.");
                    }

                    var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                    if (string.IsNullOrEmpty(userId))
                    {
                        throw new InvalidOperationException("Invalid token claims.");
                    }

                    var user = await _context.ActUsers
                        .FirstOrDefaultAsync(u => u.UserId.ToString() == userId);

                    return user ?? throw new InvalidOperationException("User not found or token is invalid.");
                }
                else
                {
                    throw new InvalidOperationException("Invalid token.");
                }
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to retrieve user by reset token.", ex);
            }
        }


        public static Task RevokeTokenAsync(string token)
        {
            InvalidTokens[token] = DateTime.UtcNow;
            return Task.CompletedTask;
        }
    }
}
