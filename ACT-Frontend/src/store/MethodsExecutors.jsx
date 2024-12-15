import axios from "axios";

export const PostMethodExecutor = (url,data) => {
    return axios.post(url, data);
};

export const GetMethodExecutor = (url, config = {}) => {
    return axios.get(url, config);
}; 
export const GetMethodExecutorYedek = (url) => {
    return axios.get(url);
}; 