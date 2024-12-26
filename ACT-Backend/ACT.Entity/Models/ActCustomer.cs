using System;
using System.Collections.Generic;

namespace ACT.Entity.Models
{
    public partial class ActCustomer
    {
        public int CustomerId { get; set; }

        public string CustomerName { get; set; } = null!;

        public string CustomerSurname { get; set; } = null!;

        public DateOnly DateOfBirth { get; set; }

        public string Email { get; set; } = null!;

        public string? Phone { get; set; }

        public string? Address { get; set; }


        public virtual ICollection<ActPayment> ActPayments { get; set; } = new List<ActPayment>();

        public virtual ICollection<ActReservation> ActReservations { get; set; } = new List<ActReservation>();
    }
}


