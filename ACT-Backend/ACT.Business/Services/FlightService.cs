using ACT.Business.Services.Interfaces;
using ACT.DataAccess.Repositories.Interfaces;
using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services
{
    public class FlightService : IFlightService
    {
        private readonly IFlightRepository _flightRepository;
        public FlightService(IFlightRepository flightRepository)
        {
            _flightRepository = flightRepository;
        }
        public async Task<IEnumerable<ActFlight>> GetFlightsAsync()
        {
            return await _flightRepository.GetFlightAsync();
        }
        public async Task<ActFlight> GetFlightByIdS(int id)
        {
            return await _flightRepository.GetFlightById(id);
        }
        public async Task<List<ActFlight>> SearchFlights(string departureLocation, string arrivalLocation, DateTime departureDate)
        {
            return await _flightRepository.SearchFlights(departureLocation, arrivalLocation, departureDate);
        }
    }
}
