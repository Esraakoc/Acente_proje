using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.DTO
{
    public class AddToReservationDto
    {

        public string UserId { get; set; } = null!;

        public int CustomerId { get; set; }

        public int FlightId { get; set; }

        public decimal TotalAmount { get; set; }

        public int PaymentId { get; set; }


    }
}
