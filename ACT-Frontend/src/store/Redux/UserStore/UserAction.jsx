
import { LoginUser, GetUserInfo, GetUserByIdInfo } from "./UserCrud";
import { setUser, clearUser } from "./UserSlice";

export const loginUserAction = (userData) => async (dispatch) => {

  try { 
    const response = await LoginUser(userData);

    localStorage.setItem("userToken", response.data.token);
    console.log("response",response.data.token);
    dispatch(setUser({ userId: userData.userId }));

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const getUserByIdInfoAction = (userId) => async (dispatch) => {
  try {
    const response = await GetUserByIdInfo(userId);
    localStorage.setItem("userId", response.data.userId);
    console.log("localStorage userId ", response.data.userId);
    dispatch(setUser(response.data)); 
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};

export const getUserInfoAction = () => async (dispatch) => {
  try {
    const response = await GetUserInfo();
    dispatch(setUser(response.data));
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};

export const logoutUserAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("userToken");
    if(!token){
      throw new Error("Token not found");
    }
    localStorage.removeItem("userToken");
    dispatch(clearUser());
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};