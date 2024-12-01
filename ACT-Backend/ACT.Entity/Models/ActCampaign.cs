using System;
using System.Collections.Generic;

namespace ACT_API;

public partial class ActCampaign
{
    public int CampaignId { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public decimal DiscountPercentage { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }
}
