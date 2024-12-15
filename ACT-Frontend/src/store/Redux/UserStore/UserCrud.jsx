import { GetMethodExecutor, PostMethodExecutor } from "../../MethodsExecutors";

// Kullanıcı Girişi (Login)
export const LoginUser = async (data) => {
  return await PostMethodExecutor("https://localhost:7185/api/login", data);
};

// Kullanıcı Bilgilerini Getir
export const GetUserInfo = async () => {
  const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
  if (!token) {
    throw new Error("Token bulunamadı");
  }
  return await GetMethodExecutor("https://localhost:7185/api/user",{
    headers: {
      Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
    }
  });
};


export const GetUserByIdInfo = async (userId) => {
  const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
  if (!token) {
    throw new Error("Token bulunamadı");
  }

  return await GetMethodExecutor(`https://localhost:7185/api/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
    }
  });
};