import { LoginUser, GetUserInfo, LogoutUser } from "./UserCrud";
import { setUser, clearUser } from "./UserSlice";

// Kullanıcı Giriş Yapma Aksiyonu
export const loginUserAction = (userData) => async (dispatch) => {
  try {
    const response = await LoginUser(userData);

    // Gelen Token'ı localStorage'a kaydet
    localStorage.setItem("userToken", response.Token);

    // Redux'a kullanıcıyı kaydet
    dispatch(setUser({ userId: userData.userId }));

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Kullanıcı Bilgilerini Alma Aksiyonu
export const getUserInfoAction = () => async (dispatch) => {
  try {
    const response = await GetUserInfo();

    // Redux'a kullanıcı bilgilerini kaydet
    dispatch(setUser(response));

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

    // Logout API çağrısı
    await LogoutUser(token);

    // Redux ve localStorage temizle
    localStorage.removeItem("userToken");
    dispatch(clearUser());
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};