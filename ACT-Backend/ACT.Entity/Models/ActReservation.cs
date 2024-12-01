using System;
using System.Collections.Generic;

namespace ACT_API;

public partial class ActReservation
{
    public int ReservationId { get; set; }

    public string UserId { get; set; } = null!;

    public int CustomerId { get; set; }

    public int FlightId { get; set; }

    public DateTime ReservationDate { get; set; }

    public decimal TotalAmount { get; set; }

    public int Status { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? UpdateDate { get; set; }

    public virtual ICollection<ActPayment> ActPayments { get; set; } = new List<ActPayment>();

    public virtual ActCustomer Customer { get; set; } = null!;

    public virtual ActFlight Flight { get; set; } = null!;

    public virtual ActReservationStatus StatusNavigation { get; set; } = null!;

    public virtual ActUser User { get; set; } = null!;
}
