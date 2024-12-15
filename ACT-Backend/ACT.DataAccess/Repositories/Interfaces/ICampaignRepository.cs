using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.DataAccess.Repositories.Interfaces
{
    public interface ICampaignRepository
    {
        IQueryable<ActCampaign> StatusAll(bool trackChanges);
        Task<IEnumerable<ActCampaign>> GetCampaignAsync();
        Task<ActCampaign> GetCampaignById(int campaignId);

    }
}
