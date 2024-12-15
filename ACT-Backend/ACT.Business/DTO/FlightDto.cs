using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.DTO
{
    public class FlightDto
    {
        public int FlightId { get; set; }

        public string FlightCode { get; set; } = null!;

        public DateTime DepartureDate { get; set; }

        public DateTime ArrivalDate { get; set; }

        public string DepartureLocation { get; set; } = null!;

        public string ArrivalLocation { get; set; } = null!;

        public decimal Price { get; set; }

        public int AvailableSeats { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? UpdateAt { get; set; }
        public string? Airline { get; set; } 
    }
}
