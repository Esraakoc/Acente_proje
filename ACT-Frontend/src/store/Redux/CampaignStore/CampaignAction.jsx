
import { GetCampaignIdInfo, GetCampaignInfo } from "./CampaignCrud";
import { setCampaigns } from "./CampaignSlice";


// Kullanıcı Bilgilerini Alma Aksiyonu
export const getCampaignIdInfoAction = (campaignId) => async () => {
  try {
    const response = await GetCampaignIdInfo(campaignId);
    // Redux'a kullanıcı bilgilerini kaydet 
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};

// Kullanıcı Bilgilerini Alma Aksiyonu
 export const getCampaignInfoAction = () => async (dispatch) => {
  try {
    const response = await GetCampaignInfo();
    dispatch(setCampaigns(response.data));
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
     throw error;
   }
 };

