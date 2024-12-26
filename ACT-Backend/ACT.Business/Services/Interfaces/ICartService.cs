using ACT.Business.DTO;
using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services.Interfaces
{
    public interface ICartService
    {
        Task<IEnumerable<ActCart>> GetCartAsync();
        Task<IEnumerable<ActCart>> GetCartByIdS(string userId);
        Task DeleteCart(int cartId);
        Task DeleteUserCart(string user);
        Task<ActCart> AddToCart(AddToCartDto cartDto);
    }
}
