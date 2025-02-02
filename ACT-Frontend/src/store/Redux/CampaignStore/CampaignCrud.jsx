import { GetMethodExecutor, PostMethodExecutor } from "../../MethodsExecutors";


 export const GetCampaignInfo = async () => {
   const token = localStorage.getItem("userToken"); 
   const userId = localStorage.getItem("userId");
   if (!token) {
     throw new Error("Token bulunamadı");
   }
   return await GetMethodExecutor(`https://localhost:7185/api/campaign?userId=${userId}`,{
     headers: {
       Authorization: `Bearer ${token}` 
     }
  });
};


export const GetCampaignIdInfo = async (campaignId) => {
  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  if (!token) {
    throw new Error("Token bulunamadı");
  }

  return await GetMethodExecutor(`https://localhost:7185/api/campaign/${campaignId}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
};