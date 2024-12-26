using ACT.Business.DTO;
using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services.Interfaces
{
    public interface IReservationService
    {
        Task<IEnumerable<ActReservation>> GetReservationAsync();
        Task<bool> DeletetReservation(int reservationId);
        Task<ActReservation> AddToReservation(AddToReservationDto reservationDto);
        Task<ActReservation> GetReservationByIdAsync(int reservationId);
    }
}
