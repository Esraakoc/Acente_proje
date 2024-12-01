using System;
using System.Collections.Generic;

namespace ACT_API;

public partial class ActPayment
{
    public int PaymentId { get; set; }

    public int ReservationId { get; set; }

    public string UserId { get; set; } = null!;

    public DateTime PaymentDate { get; set; }

    public decimal PaymentAmount { get; set; }

    public int PaymentStatus { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public virtual ActPaymentStatus PaymentStatusNavigation { get; set; } = null!;

    public virtual ActReservation Reservation { get; set; } = null!;

    public virtual ActUser User { get; set; } = null!;
}
