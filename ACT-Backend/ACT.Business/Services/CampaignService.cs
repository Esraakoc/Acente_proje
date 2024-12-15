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
    public class CampaignService: ICampaignService
    {
        private readonly ICampaignRepository _campaignRepository;
        public CampaignService(ICampaignRepository campaignRepository)
        {
            _campaignRepository = campaignRepository;
        }
        public async Task<IEnumerable<ActCampaign>> GetCampaignsAsync()
        {
            return await _campaignRepository.GetCampaignAsync();
        }
        public async Task<ActCampaign> GetCampaignByIdS(int id)
        {
            return await _campaignRepository.GetCampaignById(id);
        }
    }
}
