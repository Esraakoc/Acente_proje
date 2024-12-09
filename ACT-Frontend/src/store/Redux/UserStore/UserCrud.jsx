import { GetMethodExecutor, PostMethodExecutor } from "../../MethodsExecutors";

// Kullanıcı Girişi (Login)
export const LoginUser = async (data) => {
  return await PostMethodExecutor("https://localhost:7185/api/login", data);
};

// Kullanıcı Bilgilerini Getir
export const GetUserInfo = async () => {
  return await GetMethodExecutor("https://localhost:7185/api/user");
};


export const GetUserByIdInfo = async (userId) => {
  return await GetMethodExecutor(`https://localhost:7185/api/user/${userId}`);
};