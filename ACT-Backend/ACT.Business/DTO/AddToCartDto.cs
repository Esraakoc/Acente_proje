using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.DTO
{
    public class AddToCartDto
    {
        public string UserId { get; set; } = null!;

        public int FlightId { get; set; }

        public int Quantity { get; set; }
    }
}
