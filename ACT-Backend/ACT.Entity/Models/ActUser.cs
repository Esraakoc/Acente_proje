using System;
using System.Collections.Generic;

namespace ACT_API;

public partial class ActUser
{
    public string UserId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public virtual ICollection<ActCart> ActCarts { get; set; } = new List<ActCart>();

    public virtual ICollection<ActPayment> ActPayments { get; set; } = new List<ActPayment>();

    public virtual ICollection<ActReservation> ActReservations { get; set; } = new List<ActReservation>();
}
