import { axiosInstance } from "@/config/axios";
import { User, UserPayload } from "@/models/user.model";

export const getUsers = async (): Promise<User[]> => {
    try {
        const { data } = await axiosInstance.get<User[]>('/users')
        return data
    } catch (error: any) {
        throw Error(error)
    }
} 

export const registerUser = async (userPayload:UserPayload): Promise<User[]> => {
    try {
        const { data } = await axiosInstance.post<User[]>('/users/customer', userPayload)
        return data
    } catch (error: any) {
        throw Error(error)
    }
} 