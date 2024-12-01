using System;
using System.Collections.Generic;

namespace ACT.Entity.Models
{
    public partial class ActReservationStatus
    {
        public int ReservationStatusId { get; set; }

        public string StatusName { get; set; } = null!;

        public virtual ICollection<ActReservation> ActReservations { get; set; } = new List<ActReservation>();
    }
}


