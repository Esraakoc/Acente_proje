using ACT.Business.DTO;
using ACT.Business.Services.Interfaces;
using ACT.DataAccess.Repositories;
using ACT.DataAccess.Repositories.Interfaces;
using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        public PaymentService(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }
        public async Task<IEnumerable<ActPayment>> GetPaymentsAsync()
        {
            return await _paymentRepository.GetPaymentAsync();
        }
        public async Task<ActPayment> CreatePaymentAsync(AddToPaymentDto paymentDto)
        {
            var newPayment = new ActPayment
            {
               CustomerId = paymentDto.CustomerId,
               UserId = paymentDto.UserId,
               PaymentDate = DateTime.UtcNow,
               PaymentStatus= 1,
               PaymentAmount = paymentDto.PaymentAmount,
               CreditCardNo=paymentDto.CreditCardNo,
               ExpiryDate=paymentDto.ExpiryDate,   
               CVV = paymentDto.CVV, 
            };

            await _paymentRepository.CreatePaymentAsync(newPayment);
            return newPayment;
        }

        public async Task<bool> DeletePaymentAsync(int paymentId)
        {
            var payment = await _paymentRepository.GetPaymentByIdAsync(paymentId);
            if (payment == null)
            {
                return false;
            }

            await _paymentRepository.DeletePaymentAsync(payment);
            return true;
        }
    }
}
