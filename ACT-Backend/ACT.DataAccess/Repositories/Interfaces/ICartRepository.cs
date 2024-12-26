using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories.Interfaces
{
    public interface ICartRepository
    {
        Task<IEnumerable<ActCart>> GetCartById(string userId);
        Task<IEnumerable<ActCart>> GetCartAsync();
        Task DeleteCart(int cartId);
        Task DeletUserCart(string user);
        Task AddCart(ActCart newCart);
    }
}
