using System;
using System.Collections.Generic;

namespace ACT_API;

public partial class ActFlight
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

    public virtual ICollection<ActCart> ActCarts { get; set; } = new List<ActCart>();

    public virtual ICollection<ActReservation> ActReservations { get; set; } = new List<ActReservation>();
}
