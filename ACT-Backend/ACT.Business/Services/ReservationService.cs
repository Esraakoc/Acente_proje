using ACT.Business.DTO;
using ACT.Business.Services.Interfaces;
using ACT.DataAccess.Repositories;
using ACT.DataAccess.Repositories.Interfaces;
using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        public ReservationService(IReservationRepository reservationRepository)
        {
            _reservationRepository = reservationRepository;
        }
        public async Task<IEnumerable<ActReservation>> GetReservationAsync()
        {
            return await _reservationRepository.GetReservationAsync();
        }
        public async Task<List<ActReservation>> GetReservationByIdAsync(int reservationId)
        {
            return await _reservationRepository.GetReservationByIdAsync(reservationId);
        }
        public async Task<List<ActReservation>> GetReservationsByUserIdAsync(string userId)
        {
            return await _reservationRepository.GetReservationsByUserIdAsync(userId);
        }
        //public async Task<bool> DeletetReservation(int reservationId)
        //{
        //    var reservation = await _reservationRepository.GetReservationByIdAsync(reservationId);
        //    if (reservation == null)
        //    {
        //        return false;
        //    }

        //    await _reservationRepository.DeleteReservationAsync(reservation);
        //    return true;
        //}
        public async Task<ActReservation> AddToReservation(AddToReservationDto reservationDto)
        {
            var newReservation = new ActReservation
            {
                UserId = reservationDto.UserId,
                FlightId = reservationDto.FlightId,
                CustomerId = reservationDto.CustomerId,
                TotalAmount = reservationDto.TotalAmount,
                PaymentId = reservationDto.PaymentId,
                ReservationDate = DateTime.UtcNow,
                Status = 1,

            };

            await _reservationRepository.CreateReservationAsync(newReservation);
            return newReservation;
        }
    }
}
