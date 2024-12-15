using ACT.DataAccess.Repositories.Interfaces;
using ACT.Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories
{
    public class FlightRepository: IFlightRepository
    {
        private readonly AppDbContext _context;
        public FlightRepository(AppDbContext context)
        {
            _context = context;
        }
        public IQueryable<ActFlight> StatusAll(bool trackChanges)
        {
            return trackChanges ? _context.ActFlights : _context.ActFlights.AsNoTracking();
        }
        public async Task<IEnumerable<ActFlight>> GetFlightAsync()
        {
            return await StatusAll(trackChanges: false).ToListAsync();
        }
        public async Task<ActFlight> GetFlightById(int flightId)
        {
            var flight = await StatusAll(trackChanges: true).FirstOrDefaultAsync(t => t.FlightId == flightId);
            if (flight == null)
            {
                throw new Exception($"Campaign with ID {flightId} not found");
            }
            return flight;
        }
        public async Task<List<ActFlight>> SearchFlights(string departureLocation, string arrivalLocation, DateTime departureDate)
        {
            return await _context.ActFlights
                .Where(f => f.DepartureLocation == departureLocation &&
                            f.ArrivalLocation == arrivalLocation &&
                            f.DepartureDate.Date == departureDate.Date)
                .ToListAsync();
        }
    }
}
