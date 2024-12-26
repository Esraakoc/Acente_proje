using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services.Interfaces
{
    public interface ICustomerService
    {

        Task<ActCustomer> GetOrCreateCustomerAsync(string firstName, string lastName, string phone);
    }
}
