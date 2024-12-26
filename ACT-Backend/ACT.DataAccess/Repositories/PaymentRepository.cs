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
    public class PaymentRepository : IPaymentRepository
    {
        private readonly AppDbContext _context;
        public PaymentRepository(AppDbContext context)
        {
            _context = context;
        }
        public IQueryable<ActPayment> StatusAll(bool trackChanges)
        {
            return trackChanges ? _context.ActPayments : _context.ActPayments.AsNoTracking();
        }
        public async Task<IEnumerable<ActPayment>> GetPaymentAsync()
        {
            return await StatusAll(trackChanges: false).ToListAsync();
        }
        public async Task<ActPayment> GetPaymentByIdAsync(int paymentId)
        {
            return await _context.ActPayments
                .FirstOrDefaultAsync(p => p.PaymentId == paymentId);
        }

        public async Task CreatePaymentAsync(ActPayment payment)
        {
            await _context.ActPayments.AddAsync(payment);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePaymentAsync(ActPayment payment)
        {
            _context.ActPayments.Remove(payment);
            await _context.SaveChangesAsync();
        }
    }
}
