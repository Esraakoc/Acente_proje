import { AddToReservation, DeleteReservation, GetReservationByIdAction, GetReservationByUserIdCrud, GetReservationInfo } from "./ReservationCrud";



export const getReservationInfoAction = () => async () => {
    try {
      const response = await GetReservationInfo();
      return response;
    } catch (error) {
      console.error("Get User Info Error:", error);
      throw error;
    }
};

export const GetReservationByUserIdAction = () => async () => {
  try {
    const response = await GetReservationByUserIdCrud();
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};
export const getReservationByIdInfoAction = (reservationId) => async () => {
  try {
    const response = await GetReservationByIdAction(reservationId);
    return response;
  } catch (error) {
    console.error("Get User Info Error:", error);
    throw error;
  }
};
export const deleteReservationAction = (reservationId) => async () => {
    try {
      const response = await DeleteReservation(reservationId);
      console.log("Silme işlemi başarılı:", response.data);
  
      return response;
    } catch (error) {
      console.error("Silme işlemi sırasında hata oluştu:", error);
      throw error;
    }
  };
export const addToReservationAction = (reservationData) => async () => {
    try {
      const response = await AddToReservation(reservationData);
      console.log("Sepete eklendi:", response.data);
      return response;
    } catch (error) { 
      console.error("Sepete ekleme sırasında hata oluştu:", error);
      throw error;
    }
  };