import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignInfoAction } from "../store/Redux/CampaignStore/CampaignAction";
import kampanya2 from "../images/kampanya2.png";
import kampanya3 from "../images/kampanya3.png";
import mainKampanya from "../images/flightMainImg.png";
import kampanya5 from "../images/kampanya5.png";
import kampanya6 from "../images/kampanya6.png";
import kampanya7 from "../images/kampanya7.png";
import kampanya8 from "../images/kampanya8.png";
import { useNavigate } from "react-router-dom";
import { setSelectedCampaign } from "../store/Redux/CampaignStore/CampaignSlice";

const Campaigns = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const campaigns = useSelector((state) => state.campaign.campaigns);
  
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
        await dispatch(getCampaignInfoAction());

      } catch (error) {
        console.error("Kampanya verileri alınırken hata oluştu:", error);
      }
    };

    fetchData();
  }, [dispatch]);


  const getImagePath = (campaignId) => {

    return campaignImages[campaignId] || kampanya2;
  };
  const handleCardClick =(campaign)=>{
    dispatch(setSelectedCampaign(campaign));
    navigate(`/campaign/${campaign.campaignId}`);
  }
  return (
    <Box
      sx={{
        padding: 4,
        marginTop: "64px", 
        marginLeft: "240px", 
      }}
    >
      <Typography variant="h4" gutterBottom >
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
            key={campaign.campaignId}
            sx={{
              borderRadius:"10px",
              width: "300px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
              },
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(campaign)}
          >
            <CardMedia
              component="img"
              height="140"
              image={getImagePath(campaign.campaignId)}
              alt={campaign.title}
            />
            <CardContent>
              <Typography variant="h6" noWrap>
                {campaign.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {campaign.description}
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