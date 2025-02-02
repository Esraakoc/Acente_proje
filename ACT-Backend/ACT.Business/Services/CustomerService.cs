using ACT.Business.Services.Interfaces;
using ACT.DataAccess.Repositories.Interfaces;
using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ACT.Business.DTO;

namespace ACT.Business.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public async Task<ActCustomer> GetOrCreateCustomerAsync(string firstName, string lastName, string phone)
        {

        

            var existingCustomer = await _customerRepository.GetCustomerByDetailsAsync(firstName, lastName, phone);
            if (existingCustomer != null)
            {
                return existingCustomer; 
            }

            var newCustomer = new ActCustomer
            {
                CustomerName = firstName,
                CustomerSurname = lastName,
                Phone = phone,
                Email = $"{firstName.ToLower()}.{lastName.ToLower()}@default.com",
            };

            await _customerRepository.CreateCustomerAsync(newCustomer);
            return newCustomer;
        }
    }
}

