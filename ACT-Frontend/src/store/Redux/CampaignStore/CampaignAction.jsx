
import { GetCampaignIdInfo, GetCampaignInfo } from "./CampaignCrud";
import { setCampaigns } from "./CampaignSlice";


export const getCampaignIdInfoAction = (campaignId) => async () => {
  try {
    const response = await GetCampaignIdInfo(campaignId);
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};

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

