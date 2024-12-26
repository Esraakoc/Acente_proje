import { DeleteMethodExecutor, GetMethodExecutor, PostMethodWithTokenExecutor } from "../../MethodsExecutors";


export const GetPaymentInfo = async () => {
    const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
    const userId = localStorage.getItem("userId");
    if (!token) {
      throw new Error("Token bulunamadı"); 
    }
    return await GetMethodExecutor(`https://localhost:7185/api/payment?userId=${userId}`,{
      headers: {
        Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
      }
   });
 };


export const DeletePayment = async (paymentId) => {
  const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
  const userId = localStorage.getItem("userId");
  
  if (!token) {
    throw new Error("Token bulunamadı");
  }

  return await DeleteMethodExecutor(`https://localhost:7185/api/payment/${paymentId}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
    }
  });
};

export const AddToPayment = async (paymentData) => {
    const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
    const userId = localStorage.getItem("userId");
  
    if (!token) {
      throw new Error("Token bulunamadı");
    }
  
    return await PostMethodWithTokenExecutor(`https://localhost:7185/api/payment?userId=${userId}`, paymentData, {
      headers: {
        Authorization:  `Bearer ${token}` // Header'a Bearer formatında token ekleyin
      }
    });
  };