import { GetFlightList, PostFlight } from "./FlightCrud";


export const getFlightListAction = (data) => async () => {
    try {
    
    const response = await GetFlightList();
    return response;
  
    } catch (error) {

      console.error(error);
      return error;
    }
};

export const postFlightAction = (data) => async () => {
  try {
  
  const response = await PostFlight(data);
  return response;

  } catch (error) {

    console.error(error);
    return error;
  }
};