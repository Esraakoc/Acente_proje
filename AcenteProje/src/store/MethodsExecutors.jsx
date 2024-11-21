import axios from "axios";

export const PostMethodExecutor = (url,data) => {
    return axios.post(url, data);
};

export const GetMethodExecutor = (url) => {
    return axios.get(url);
};