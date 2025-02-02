import { GetMethodExecutor, PostMethodExecutor } from "../../MethodsExecutors";


export const LoginUser = async (data) => {
  return await PostMethodExecutor("https://localhost:7185/api/login", data);
};

export const GetUserInfo = async () => {
  const token = localStorage.getItem("userToken"); 
  if (!token) {
    throw new Error("Token bulunamadı");
  }
  return await GetMethodExecutor("https://localhost:7185/api/user",{
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
};


export const GetUserByIdInfo = async (userId) => {
  const token = localStorage.getItem("userToken"); 
  if (!token) {
    throw new Error("Token bulunamadı");
  }

  return await GetMethodExecutor(`https://localhost:7185/api/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
};