using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories.Interfaces
{
    public interface IReservationRepository
    {
        Task<IEnumerable<ActReservation>> GetReservationAsync();
        Task<ActReservation> GetReservationByIdAsync(int reservationId);
        Task CreateReservationAsync(ActReservation reservation);
        Task DeleteReservationAsync(ActReservation reservation);
    }
}
