import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useSelector } from "react-redux";
import kampanya2 from "../images/kampanya2.png";
import kampanya3 from "../images/kampanya3.png";
import kampanya5 from "../images/kampanya5.png";
import kampanya6 from "../images/kampanya6.png";
import kampanya7 from "../images/kampanya7.png";
import kampanya8 from "../images/kampanya8.png";

const CampaignDetail = () => {
  const selectedCampaign = useSelector((state) => state.campaign.selectedCampaign);

  const campaignImages = [kampanya2, kampanya3, kampanya5, kampanya6, kampanya7, kampanya8];
  const getImagePath = (campaignId) => {
    return campaignImages[campaignId % campaignImages.length] || kampanya2;
  };

  if (!selectedCampaign) {
    return <Typography variant="h6">Kampanya bulunamadı!</Typography>;
  }

  return (
    <Box sx={{ display: "flex", padding: 20, gap: 4 }}>
      <CardMedia
        component="img"
        image={getImagePath(selectedCampaign.campaignId)}
        alt={selectedCampaign.title}
        sx={{ width: "40%", borderRadius: "10px" }}
      />
      <Card sx={{ flex: 1, padding: 2, borderRadius: "10px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>{selectedCampaign.title}</Typography>
          <Typography variant="body1" paragraph>{selectedCampaign.description}</Typography>
          <Typography variant="body2" color="text.primary">
            İndirim: %{selectedCampaign.discountPercentage}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Başlangıç: {new Date(selectedCampaign.startDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bitiş: {new Date(selectedCampaign.endDate).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CampaignDetail;