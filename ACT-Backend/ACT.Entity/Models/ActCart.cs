﻿using System;
using System.Collections.Generic;

namespace ACT_API;

public partial class ActCart
{
    public int CartId { get; set; }

    public int CustomerId { get; set; }

    public string UserId { get; set; } = null!;

    public int FlightId { get; set; }

    public int Quantity { get; set; }

    public DateTime AddedAt { get; set; }

    public virtual ActCustomer Customer { get; set; } = null!;

    public virtual ActFlight Flight { get; set; } = null!;

    public virtual ActUser User { get; set; } = null!;
}
