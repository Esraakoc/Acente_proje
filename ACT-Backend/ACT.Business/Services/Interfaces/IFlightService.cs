using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services.Interfaces
{
    public interface IFlightService
    {
        Task<IEnumerable<ActFlight>> GetFlightsAsync();
        Task<ActFlight> GetFlightByIdS(int id);
        Task<List<ActFlight>> SearchFlights(string departureLocation, string arrivalLocation, DateTime departureDate);
    }
}
