import { GetFlightIdInfo, GetFlightInfo, GetFlightSearchResultInfo} from "./FlightCrud";


// export const getFlightListAction = (data) => async () => {
//     try {
    
//     const response = await GetFlightList(); 
//     return response;
  
//     } catch (error) {

//       console.error(error);
//       return error;
//     }
// };

// export const postFlightAction = (data) => async () => {
//   try {
  
//   const response = await PostFlight(data);
//   return response;

//   } catch (error) {

//     console.error(error);
//     return error;
//   }
// };

export const getFlightIdInfoAction = (flightId) => async () => {
  try {
    const response = await GetFlightIdInfo(flightId);
    // Redux'a kullanıcı bilgilerini kaydet

    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};
export const getFlightSearchAction = (departureLocation, arrivalLocation, departureDate) => async () => {
  try {
    const response = await GetFlightSearchResultInfo(departureLocation, arrivalLocation, departureDate);
    // Redux'a kullanıcı bilgilerini kaydet

    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};

// Kullanıcı Bilgilerini Alma Aksiyonu
 export const getFlightInfoAction = () => async () => {
  try {
    const response = await GetFlightInfo();
     return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
     throw error;
   }
 };