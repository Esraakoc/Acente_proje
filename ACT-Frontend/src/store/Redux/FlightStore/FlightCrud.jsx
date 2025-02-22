import { GetMethodExecutor, PostMethodExecutor } from "../../MethodsExecutors";


export const GetFlightInfo = async () => {
    const token = localStorage.getItem("userToken"); 
    const userId = localStorage.getItem("userId");
    if (!token) {
      throw new Error("Token bulunamadı"); 
    }
    return await GetMethodExecutor(`https://localhost:7185/api/flight?userId=${userId}`,{
      headers: {
        Authorization: `Bearer ${token}` 
      }
   });
 };

  
 export const GetFlightSearchResultInfo = async (departureLocation, arrivalLocation, departureDate) => {
    const token = localStorage.getItem("userToken"); 
    const userId = localStorage.getItem("userId");
    if (!token) {
      throw new Error("Token bulunamadı");
    }
  
    return await GetMethodExecutor(`https://localhost:7185/api/flight/search?departureLocation=${departureLocation}&arrivalLocation=${arrivalLocation}&departureDate=${departureDate}&userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
  };
 export const GetFlightIdInfo = async (flightId) => {
   const token = localStorage.getItem("userToken"); 
   const userId = localStorage.getItem("userId");
   if (!token) {
     throw new Error("Token bulunamadı");
   }
 
   return await GetMethodExecutor(`https://localhost:7185/api/flight/${flightId}?userId=${userId}`, {
     headers: {
       Authorization: `Bearer ${token}` 
     }
   });
 };