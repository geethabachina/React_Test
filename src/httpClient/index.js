import { create } from "apisauce";

const httpClient = create({
    baseURL: process.env.REACT_APP_API_END_POINT
});

export { httpClient };