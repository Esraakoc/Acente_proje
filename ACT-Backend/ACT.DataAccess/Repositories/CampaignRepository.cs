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
    public class CampaignRepository : ICampaignRepository
    {
        private readonly AppDbContext _context;
        public CampaignRepository(AppDbContext context)
        {
            _context = context;
        }
        public IQueryable<ActCampaign> StatusAll(bool trackChanges)
        {
            return trackChanges ? _context.ActCampaigns : _context.ActCampaigns.AsNoTracking();
        }
        public async Task<IEnumerable<ActCampaign>> GetCampaignAsync()
        {
            return await StatusAll(trackChanges: false).ToListAsync();
        }
        public async Task<ActCampaign> GetCampaignById(int campaignId)
        {
            var campaign = await StatusAll(trackChanges: true).FirstOrDefaultAsync(t => t.CampaignId == campaignId);
            if (campaign == null)
            {
                throw new Exception($"Campaign with ID {campaignId} not found");
            }
            return campaign;
        }
       
    }
}
