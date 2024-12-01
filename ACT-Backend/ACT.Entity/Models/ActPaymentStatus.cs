using System;
using System.Collections.Generic;

namespace ACT.Entity.Models
{
    public partial class ActPaymentStatus
    {
        public int PaymentStatusId { get; set; }

        public string StatusName { get; set; } = null!;

        public virtual ICollection<ActPayment> ActPayments { get; set; } = new List<ActPayment>();
    }
}


