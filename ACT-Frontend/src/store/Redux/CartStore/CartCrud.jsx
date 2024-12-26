import { DeleteMethodExecutor, GetMethodExecutor, PostMethodWithTokenExecutor } from "../../MethodsExecutors";


export const GetCartInfo = async () => {
    const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
    const userId = localStorage.getItem("userId");
    if (!token) {
      throw new Error("Token bulunamadı"); 
    }
    return await GetMethodExecutor(`https://localhost:7185/api/cart?userId=${userId}`,{
      headers: {
        Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
      }
   });
 };


export const GetCartIdInfo = async (user) => {
    const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
    const userId = localStorage.getItem("userId");
    if (!token) {
      throw new Error("Token bulunamadı");
    }
  
    return await GetMethodExecutor(`https://localhost:7185/api/cart/${user}?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
      }
    });
  };

export const DeleteCart = async (cartId) => {
  const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
  const userId = localStorage.getItem("userId");
  
  if (!token) {
    throw new Error("Token bulunamadı");
  }

  return await DeleteMethodExecutor(`https://localhost:7185/api/cart/${cartId}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
    }
  });
};

export const DeleteUserCart = async () => {
  const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
  const userId = localStorage.getItem("userId");
  
  if (!token) {
    throw new Error("Token bulunamadı");
  }

  return await DeleteMethodExecutor(`https://localhost:7185/api/cart/delete/${userId}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
    }
  });
};
export const AddToCart = async (cartData) => {
    const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
    const userId = localStorage.getItem("userId");
  
    if (!token) {
      throw new Error("Token bulunamadı");
    }
  
    return await PostMethodWithTokenExecutor(`https://localhost:7185/api/cart?userId=${userId}`, cartData, {
      headers: {
        Authorization:  `Bearer ${token}` // Header'a Bearer formatında token ekleyin
      }
    });
  };