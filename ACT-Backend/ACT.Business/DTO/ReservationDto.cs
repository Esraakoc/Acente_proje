using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.DTO
{
    public class ReservationDto
    {
        public int ReservationId { get; set; }

        public string UserId { get; set; } = null!;

        public int CustomerId { get; set; }

        public int FlightId { get; set; }

        public DateTime ReservationDate { get; set; }

        public decimal TotalAmount { get; set; }

        public int Status { get; set; }

        public int? PaymentId { get; set; }

        public DateTime? UpdateDate { get; set; }

        public CustomerDto? Customer { get; set; }
        public UserDto? User { get; set; }
        public FlightDto? Flight { get; set; }
        public PaymentDto? Payment { get; set; }
    }
}
