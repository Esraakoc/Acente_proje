
import { GetCampaignIdInfo, GetCampaignInfo } from "./CampaignCrud";
import { setCampaign } from "./CampaignSlice";

// Kullanıcı Giriş Yapma Aksiyonu
// export const loginUserAction = (userData) => async (dispatch) => {

//   try {
//     const response = await LoginUser(userData);

//     // Gelen Token'ı localStorage'a kaydet
//     localStorage.setItem("userToken", response.data.token);
//     console.log("response",response.data.token);
//     // Redux'a kullanıcıyı kaydet
//     dispatch(setUser({ userId: userData.userId }));

//     return response;
//   } catch (error) {
//     console.error("Login Error:", error);
//     throw error;
//   }
// };

// Kullanıcı Bilgilerini Alma Aksiyonu
export const getCampaignIdInfoAction = (campaignId) => async (dispatch) => {
  try {
    const response = await GetCampaignIdInfo(campaignId);
    // Redux'a kullanıcı bilgilerini kaydet
    dispatch(setCampaign(response.data)); 
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};

// Kullanıcı Bilgilerini Alma Aksiyonu
 export const getCampaignInfoAction = () => async () => {
  try {
    const response = await GetCampaignInfo();
     return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
     throw error;
   }
 };

// // Kullanıcı Çıkışı Aksiyonu
// export const logoutUserAction = () => async (dispatch) => {
//   try {
//     const token = localStorage.getItem("userToken");
//     if(!token){
//       throw new Error("Token not found");
//     }
//     // Redux ve localStorage temizle
//     localStorage.removeItem("userToken");
//     dispatch(clearUser());
//   } catch (error) {
//     console.error("Logout Error:", error);
//     throw error;
//   }
// };