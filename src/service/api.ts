import axios, { AxiosResponse } from "axios";
import { baseURL } from "../constants";
import { TUser } from "../types";

axios.defaults.baseURL = baseURL;

export async function FetchAllUsers(): Promise<AxiosResponse> {
    return await axios
        .get<TUser[]>("/users")
        .then((response: AxiosResponse) => response)
        .catch((error: AxiosResponse) => error);
}

export async function FetchSearchUsers(
    searchEmail: string
): Promise<AxiosResponse> {
    // searchEmail: string
    return await axios
        .get<TUser[]>(`/users?email_like=${searchEmail}`)
        .then((response: AxiosResponse) => response)
        .catch((error: AxiosResponse) => error);
}
