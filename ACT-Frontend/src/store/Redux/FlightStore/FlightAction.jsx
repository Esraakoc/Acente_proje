import { GetFlightIdInfo, GetFlightInfo, GetFlightSearchResultInfo} from "./FlightCrud";


export const getFlightIdInfoAction = (flightId) => async () => {
  try {
    const response = await GetFlightIdInfo(flightId);
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
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};

 export const getFlightInfoAction = () => async () => {
  try {
    const response = await GetFlightInfo();
     return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
     throw error;
   }
 };