using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ACT.Entity.Models
{
    public partial class ActPayment
    {
        public int PaymentId { get; set; }
        public int CustomerId { get; set; }

        public string UserId { get; set; } = null!;

        public DateTime PaymentDate { get; set; }

        public decimal PaymentAmount { get; set; }

        public int PaymentStatus { get; set; }

        public string CreditCardNo { get; set; } = null!; 

        public DateTime ExpiryDate { get; set; }

        public string CVV { get; set; } = null!;

        public virtual ICollection<ActReservation> ActReservations { get; set; } = new List<ActReservation>();

        public virtual ActPaymentStatus PaymentStatusNavigation { get; set; } = null!;

        [JsonIgnore]
        public virtual ActCustomer Customer { get; set; } = null!;

        public virtual ActUser User { get; set; } = null!;
    }
}


