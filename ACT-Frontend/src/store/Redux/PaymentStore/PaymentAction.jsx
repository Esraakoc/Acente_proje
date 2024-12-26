import { AddToPayment, DeletePayment, GetPaymentInfo } from "./PaymentCrud";


export const getPaymentInfoAction = () => async () => {
    try {
        const response = await GetPaymentInfo();
        return response;
    } catch (error) {
        console.error("Get User Info Error:", error);
        throw error;
        }
};

export const deletePaymentAction = (paymentId) => async () => {
  try {
    const response = await DeletePayment(paymentId);
    console.log("Silme işlemi başarılı:", response.data);

    return response;
  } catch (error) {
    console.error("Silme işlemi sırasında hata oluştu:", error);
    throw error;
  }
};
export const addToPaymentAction = (paymentData) => async () => {
    try {
      const response = await AddToPayment(paymentData);
      console.log("Sepete eklendi:", response.data);
      return response;
    } catch (error) {
      console.error("Sepete ekleme sırasında hata oluştu:", error);
      throw error;
    }
  };