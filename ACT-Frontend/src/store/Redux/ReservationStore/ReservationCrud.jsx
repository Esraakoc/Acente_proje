import { DeleteMethodExecutor, GetMethodExecutor, PostMethodWithTokenExecutor } from "../../MethodsExecutors";
const token = localStorage.getItem("userToken");
const userId = localStorage.getItem("userId");

export const GetReservationInfo = async () => {
    const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
    const userId = localStorage.getItem("userId");
    if (!token) {
      throw new Error("Token bulunamadı"); 
    }
    return await GetMethodExecutor(`https://localhost:7185/api/reservation?userId=${userId}`,{
      headers: {
        Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
      }
   });
 };

 export const GetReservationByIdAction = async(reservationId) => {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");

    if (!token) {
        throw new Error("Token bulunamadı");
    }
    return await GetMethodExecutor(`https://localhost:7185/api/reservation/${reservationId}?userId=${userId}`, {
        headers: { 
            Authorization: `Bearer ${token}`,
        },
    });
 }

export const DeleteReservation = async (reservationId) => {
  const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
  const userId = localStorage.getItem("userId");
  
  if (!token) {
    throw new Error("Token bulunamadı");
  }

  return await DeleteMethodExecutor(`https://localhost:7185/api/reservation/${reservationId}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}` // Header'a Bearer formatında token ekleyin
    }
  });
};

export const AddToReservation = async (reservationData) => {
    const token = localStorage.getItem("userToken"); // Token'ı localStorage'dan al
    const userId = localStorage.getItem("userId");
  
    if (!token) {
      throw new Error("Token bulunamadı");
    }
  
    return await PostMethodWithTokenExecutor(`https://localhost:7185/api/reservation?userId=${userId}`, reservationData, {
      headers: {
        Authorization:  `Bearer ${token}` // Header'a Bearer formatında token ekleyin
      }
    });
  };