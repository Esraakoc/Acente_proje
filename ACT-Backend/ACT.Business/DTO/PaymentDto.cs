using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.DTO
{
    public class PaymentDto
    {
        public int PaymentId { get; set; }
        public int CustomerId { get; set; }

        public string UserId { get; set; } = null!;

        public DateTime PaymentDate { get; set; }

        public decimal PaymentAmount { get; set; }

        public int PaymentStatus { get; set; }

        public string CreditCardNo { get; set; } = null!;

        public string ExpiryDate { get; set; } = null!;

        public string CVV { get; set; } = null!;
        public UserDto? User { get; set; }  

    }
}
