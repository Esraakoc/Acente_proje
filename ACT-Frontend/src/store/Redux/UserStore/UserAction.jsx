
import { LoginUser, GetUserInfo, GetUserByIdInfo } from "./UserCrud";
import { setUser, clearUser } from "./UserSlice";

// Kullanıcı Giriş Yapma Aksiyonu
export const loginUserAction = (userData) => async (dispatch) => {

  try {
    const response = await LoginUser(userData);

    // Gelen Token'ı localStorage'a kaydet
    localStorage.setItem("userToken", response.data.token);
    console.log("response",response.data.token);
    // Redux'a kullanıcıyı kaydet
    dispatch(setUser({ userId: userData.userId }));

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Kullanıcı Bilgilerini Alma Aksiyonu
export const getUserByIdInfoAction = (userId) => async (dispatch) => {
  try {
    const response = await GetUserByIdInfo(userId);

    // Redux'a kullanıcı bilgilerini kaydet
    dispatch(setUser(response.data)); 
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};
// Kullanıcı Bilgilerini Alma Aksiyonu
export const getUserInfoAction = () => async (dispatch) => {
  try {
    const response = await GetUserInfo();

    // Redux'a kullanıcı bilgilerini kaydet
    dispatch(setUser(response.data));
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};

// Kullanıcı Çıkışı Aksiyonu
export const logoutUserAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("userToken");
    if(!token){
      throw new Error("Token not found");
    }
    // Redux ve localStorage temizle
    localStorage.removeItem("userToken");
    dispatch(clearUser());
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};