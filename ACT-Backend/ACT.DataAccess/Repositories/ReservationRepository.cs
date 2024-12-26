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
        public async Task<ActReservation> GetReservationByIdAsync(int reservationId)
        {
            return await _context.ActReservations
                .Include(r => r.User) // User bilgilerini dahil et
                .Include(r => r.Flight) // Flight bilgilerini dahil et
                .FirstOrDefaultAsync(r => r.ReservationId == reservationId);
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
