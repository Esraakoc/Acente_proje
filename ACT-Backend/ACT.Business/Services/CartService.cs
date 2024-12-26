using ACT.Business.DTO;
using ACT.Business.Services.Interfaces;
using ACT.DataAccess.Repositories;
using ACT.DataAccess.Repositories.Interfaces;
using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }
        public async Task<IEnumerable<ActCart>> GetCartAsync()
        {
            return await _cartRepository.GetCartAsync();
        }
        public async Task<IEnumerable<ActCart>> GetCartByIdS(string userId)
        {
            return await _cartRepository.GetCartById(userId);
        }
        public async Task DeleteCart(int cartId)
        {
            await _cartRepository.DeleteCart(cartId);
        }
        public async Task DeleteUserCart(string user)
        {
            await _cartRepository.DeletUserCart(user);
        }
        
        public async Task<ActCart> AddToCart(AddToCartDto cartDto)
        {
            var newCart = new ActCart
            {
                UserId = cartDto.UserId,
                FlightId = cartDto.FlightId,
                Quantity = cartDto.Quantity,
                AddedAt = DateTime.UtcNow
            };

            await _cartRepository.AddCart(newCart);
            return newCart;
        }
    }
}
