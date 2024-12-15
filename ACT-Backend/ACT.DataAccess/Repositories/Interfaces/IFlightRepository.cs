using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories.Interfaces
{
    public interface IFlightRepository
    {
        Task<IEnumerable<ActFlight>> GetFlightAsync();
        Task<ActFlight> GetFlightById(int flightId);
        Task<List<ActFlight>> SearchFlights(string departureLocation, string arrivalLocation, DateTime departureDate);
    }
}
