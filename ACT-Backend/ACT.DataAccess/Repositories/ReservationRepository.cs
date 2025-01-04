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
    public class ReservationRepository : IReservationRepository
    {
        private readonly AppDbContext _context;
        public ReservationRepository(AppDbContext context)
        {
            _context = context;
        }
        public IQueryable<ActReservation> StatusAll(bool trackChanges)
        {
            return trackChanges ? _context.ActReservations : _context.ActReservations.AsNoTracking();
        }
        public async Task<IEnumerable<ActReservation>> GetReservationAsync()
        {
            return await StatusAll(trackChanges: false).ToListAsync();
        }
        public async Task<List<ActReservation>> GetReservationsByUserIdAsync(string userId)
        {
            return await _context.ActReservations
                .Include(r => r.User) // Kullanıcı bilgilerini dahil et
                .Include(r => r.Flight) // Uçuş bilgilerini dahil et
                .Include(r => r.Customer) // Müşteri bilgilerini dahil et
                .Include(r => r.Payment) // Ödeme bilgilerini dahil et
                .Include(r => r.StatusNavigation) // Rezervasyon durumu
                .Where(r => r.UserId == userId) // Sadece belirtilen UserId'ye ait rezervasyonlar
                .ToListAsync();
        }
        public async Task<List<ActReservation>> GetReservationByIdAsync(int reservationId)
        {
            return await _context.ActReservations
                .Include(r => r.User) // User bilgilerini dahil et
                .Include(r => r.Flight)
                .Include(r => r.Customer) // Müşteri bilgilerini dahil et
                .Include(r => r.Payment)
                .Include(r => r.StatusNavigation)// Flight bilgilerini dahil et
                .Where(r => r.ReservationId == reservationId)
                .ToListAsync();
        }
        //public async Task<ActReservation> GetReservationByIdAsync(int reservationId)
        //{
        //    return await _context.ActReservations
        //        .FirstOrDefaultAsync(p => p.ReservationId == reservationId);
        //}

        public async Task CreateReservationAsync(ActReservation reservation)
        {
            await _context.ActReservations.AddAsync(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteReservationAsync(ActReservation reservation)
        {
            _context.ActReservations.Remove(reservation);
            await _context.SaveChangesAsync();
        }
    }
}
