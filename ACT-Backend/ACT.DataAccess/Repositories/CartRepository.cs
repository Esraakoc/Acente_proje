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
                .Include(c => c.User)  // User tablosunu dahil et
                .Include(c => c.Flight) // Flight tablosunu dahil et
                .ToListAsync(); //liste döndürür
                //.FirstOrDefaultAsync(t => t.UserId == userId);

            if (cart == null)
            {
                throw new Exception($"Cart with ID {userId} not found");
            }

            return cart;
        }
        public async Task<IEnumerable<ActCart>> GetCartAsync()
        {
            return await StatusAll(trackChanges: false)
                .Include(c => c.User)  // User tablosunu dahil et
                .Include(c => c.Flight) // Flight tablosunu dahil et
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
            // İlgili user değerine sahip tüm kayıtları getir
            var carts = await _context.ActCarts.Where(c => c.UserId == user).ToListAsync();

            if (carts == null || !carts.Any())
            {
                throw new Exception($"Cart with User ID {user} not found");
            }

            // Hepsini sil
            _context.ActCarts.RemoveRange(carts);

            // Değişiklikleri kaydet
            await _context.SaveChangesAsync();
        }

        public async Task AddCart(ActCart newCart)
        {
            await _context.ActCarts.AddAsync(newCart);
            await _context.SaveChangesAsync();
        }
    }
}
