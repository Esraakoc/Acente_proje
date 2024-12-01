import { GetMethodExecutor, PostMethodExecutor } from "../../MethodsExecutors";


export const GetFlightList = () => {
    return GetMethodExecutor(`http://localhost:3000/.....`);
};

export const PostFlight = (data) => {
    return PostMethodExecutor(`http://localhost:3000/.....`,data);
};