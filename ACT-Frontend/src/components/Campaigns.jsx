import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { getCampaignInfoAction } from "../store/Redux/CampaignStore/CampaignAction";
import kampanya2 from "../images/kampanya2.png";
import kampanya3 from "../images/kampanya3.png";
import mainKampanya from "../images/kampanyaMain.png";
import kampanya5 from "../images/kampanya5.png";
import kampanya6 from "../images/kampanya6.png";
import kampanya7 from "../images/kampanya7.png";
import kampanya8 from "../images/kampanya8.png";
const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const dispatch = useDispatch();
const campaignImages =[kampanya2, kampanya3];
campaignImages[2]=kampanya2;
campaignImages[3]=kampanya3;
campaignImages[5]=kampanya5;
campaignImages[6]=kampanya6;
campaignImages[7]=kampanya7;
campaignImages[8]=kampanya8;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getCampaignInfoAction());
        setCampaigns(response.data); // Kampanya verilerini state'e kaydet
      } catch (error) {
        console.error("Kampanya verileri alınırken hata oluştu:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Kampanya görseli için dinamik URL fonksiyonu
  const getImagePath = (campaignId) => {
    debugger;
    return campaignImages[campaignId] || kampanya2;
  };
  return (
    <Box
      sx={{
        padding: 4,
        marginTop: "64px", // Navbar için üst boşluk
        marginLeft: "240px", // Sidebar için sol boşluk
      }}
    >
      <Typography variant="h4" gutterBottom>
        Kampanyalar
      </Typography>
      <Card
        sx={{
          // Sabit kart yüksekliği
          marginLeft:"5.5vw",
          marginBottom:"2vw",
          height:"250px",
          width:"87%",
          display: "flex",
            borderRadius:"15px",
            overflow:"hidden",
        }}
      >
        <CardMedia
          component="img"
          image={mainKampanya}
          alt="mainImg"
          sx={{objectFit:"inherit", height:"100%"}}
        />
      </Card>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        
        {campaigns.map((campaign) => (
          <Box
            key={campaign.campaignId}
            sx={{
              width: "calc(28.33% - 16px)", // Her kartın genişliği
              margin: "8px",
              boxSizing: "border-box",
            }}
          >
            <Card
              sx={{
                height: "300px", // Sabit kart yüksekliği
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                 borderRadius:"15px",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={getImagePath(campaign.campaignId)}
                alt={campaign.title}
              />
              <CardContent
                sx={{
                  textAlign: "center",
                  overflow: "hidden", // Taşmayı önler
                  textOverflow: "ellipsis", // Metni keser
                  whiteSpace: "nowrap", // Tek satır yapar
                }}
              >
                <Typography variant="h6" component="div" noWrap>
                  {campaign.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3, // En fazla 3 satır
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {campaign.description}
                </Typography>
                <Typography variant="body2" color="text.primary" mt={1}>
                  İndirim: %{campaign.discountPercentage}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Başlangıç: {new Date(campaign.startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bitiş: {new Date(campaign.endDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Campaigns;