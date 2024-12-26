using ACT.DataAccess.Repositories.Interfaces;
using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ACT.DataAccess.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly AppDbContext _context;

        public CustomerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ActCustomer?> GetCustomerByDetailsAsync(string firstName, string lastName, string phone)
        {
            return await _context.ActCustomers
                .FirstOrDefaultAsync(c => c.CustomerName == firstName && c.CustomerSurname == lastName && c.Phone == phone);
        }

        public async Task CreateCustomerAsync(ActCustomer customer)
        {
            await _context.ActCustomers.AddAsync(customer);
            await _context.SaveChangesAsync();
        }
    }
}

