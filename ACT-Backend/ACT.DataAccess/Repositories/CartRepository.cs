using ACT.DataAccess.Repositories.Interfaces;
using ACT.Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories
{
    public class CartRepository :ICartRepository
    {
        private readonly AppDbContext _context;
        public CartRepository(AppDbContext context)
        {
            _context = context;
        }
        public IQueryable<ActCart> StatusAll(bool trackChanges)
        {
            return trackChanges ? _context.ActCarts : _context.ActCarts.AsNoTracking();
        }
        public async Task<IEnumerable<ActCart>> GetCartById(string userId)
        {
            var cart = await StatusAll(trackChanges: true)
                .Where(c => c.UserId == userId)
                .Include(c => c.User)  
                .Include(c => c.Flight) 
                .ToListAsync(); 
               
            if (cart == null)
            {
                throw new Exception($"Cart with ID {userId} not found");
            }

            return cart;
        }
        public async Task<IEnumerable<ActCart>> GetCartAsync()
        {
            return await StatusAll(trackChanges: false)
                .Include(c => c.User) 
                .Include(c => c.Flight) 
                .ToListAsync();
        }
        public async Task DeleteCart(int cartId)
        {
            var cart = await _context.ActCarts.FindAsync(cartId);
            if (cart == null)
            {
                throw new Exception($"Cart with ID {cartId} not found");
            }

            _context.ActCarts.Remove(cart);
            await _context.SaveChangesAsync();
        }
        public async Task DeletUserCart(string user)
        {
      
            var carts = await _context.ActCarts.Where(c => c.UserId == user).ToListAsync();

            if (carts == null || !carts.Any())
            {
                throw new Exception($"Cart with User ID {user} not found");
            }

        
            _context.ActCarts.RemoveRange(carts);

        
            await _context.SaveChangesAsync();
        }

        public async Task AddCart(ActCart newCart)
        {
            await _context.ActCarts.AddAsync(newCart);
            await _context.SaveChangesAsync();
        }
    }
}
