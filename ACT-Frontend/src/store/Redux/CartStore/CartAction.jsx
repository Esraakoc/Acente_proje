import { GetCartIdInfo, GetCartInfo, DeleteCart, AddToCart, DeleteUserCart } from "./CartCrud";


export const getCartIdInfoAction = (userId) => async () => {
    try {
        const response = await GetCartIdInfo(userId);
        // Redux'a kullanıcı bilgilerini kaydet

        console.log(response.data);
        return response;
    } catch (error) {
        console.error("Get User Info Error:", error);
        throw error;
    }
};
export const getCartInfoAction = () => async () => {
    try {
        const response = await GetCartInfo();
        return response;
    } catch (error) {
        console.error("Get User Info Error:", error);
        throw error;
        }
};

export const deleteCartAction = (cartId) => async () => {
  try {
    const response = await DeleteCart(cartId);
    console.log("Silme işlemi başarılı:", response.data);

    return response;
  } catch (error) {
    console.error("Silme işlemi sırasında hata oluştu:", error);
    throw error;
  }
};
export const deleteUserCartAction = () => async () => {
  try {
    const response = await DeleteUserCart();
    console.log("Silme işlemi başarılı:", response.data);

    return response;
  } catch (error) {
    console.error("Silme işlemi sırasında hata oluştu:", error);
    throw error;
  }
};
export const addToCartAction = (cartData) => async () => {
    try {
      const response = await AddToCart(cartData);
      console.log("Sepete eklendi:", response.data);
      return response;
    } catch (error) {
      console.error("Sepete ekleme sırasında hata oluştu:", error);
      throw error;
    }
  };