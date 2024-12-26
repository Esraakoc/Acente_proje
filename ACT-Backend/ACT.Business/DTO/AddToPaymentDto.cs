using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.DTO
{
    public class AddToPaymentDto
    {
        public int CustomerId { get; set; }

        public string UserId { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Phone { get; set; } = null!;

        public decimal PaymentAmount { get; set; }

        public string CreditCardNo { get; set; } = null!;

        public DateTime ExpiryDate { get; set; }

        public string CVV { get; set; } = null!;
  
    }
}
