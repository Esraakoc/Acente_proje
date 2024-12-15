import { GetMethodExecutor, PostMethodExecutor } from "../../MethodsExecutors";

// Kullanıcı Girişi (Login)
// export const LoginUser = async (data) => {
//   return await PostMethodExecutor("https://localhost:7185/api/login", data);
// };

// Kullanıcı Bilgilerini Getir
 export const GetCampaignInfo = async () => {
   const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
   const userId = localStorage.getItem("userId");
   if (!token) {
     throw new Error("Token bulunamadı");
   }
   return await GetMethodExecutor(`https://localhost:7185/api/campaign?userId=${userId}`,{
     headers: {
       Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
     }
  });
};


export const GetCampaignIdInfo = async (campaignId) => {
  const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
  const userId = localStorage.getItem("userId");
  if (!token) {
    throw new Error("Token bulunamadı");
  }

  return await GetMethodExecutor(`https://localhost:7185/api/campaign/${campaignId}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
    }
  });
};