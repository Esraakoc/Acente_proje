using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.DTO
{
    public class CartDto
    {
        public int CartId { get; set; }

        public string UserId { get; set; } = null!;

        public int FlightId { get; set; }

        public int Quantity { get; set; }

        public DateTime AddedAt { get; set; }

        public UserDto? User { get; set; }  // User bilgileri
        public FlightDto? Flight { get; set; } // Flight bilgileri

    }
}
