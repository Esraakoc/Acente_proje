using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories.Interfaces
{
    public interface ICustomerRepository
    {
        Task<ActCustomer?> GetCustomerByDetailsAsync(string firstName, string lastName, string phone);
        Task CreateCustomerAsync(ActCustomer customer);
    }
}
