using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services.Interfaces
{
    public interface ICampaignService
    {
        Task<IEnumerable<ActCampaign>> GetCampaignsAsync();
        Task<ActCampaign> GetCampaignByIdS(int id);
    }
}
