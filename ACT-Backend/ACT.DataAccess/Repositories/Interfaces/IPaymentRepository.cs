using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories.Interfaces
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<ActPayment>> GetPaymentAsync();
        Task<ActPayment> GetPaymentByIdAsync(int paymentId);
        Task CreatePaymentAsync(ActPayment payment);
        Task DeletePaymentAsync(ActPayment payment);
    }
}
