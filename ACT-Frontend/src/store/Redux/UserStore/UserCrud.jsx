import { GetMethodExecutor, PostMethodExecutor } from "../../MethodsExecutors";

// Kullanıcı Girişi (Login)
export const LoginUser = async (data) => {
  return await PostMethodExecutor("https://localhost:7185/api/login", data);
};

// Kullanıcı Bilgilerini Getir
export const GetUserInfo = async () => {
  return await GetMethodExecutor("http://localhost:7185/api/user");
};

// Kullanıcı Çıkışı (Logout)
export const LogoutUser = async (token) => {
  return await PostMethodExecutor("http://localhost:7185/api/login/logout", { token });
};