import { axiosInstance } from "@/config/axios";
import { User } from "@/models/user.model";

export const getUsers = async (): Promise<User[]> => {
    try {
        const { data } = await axiosInstance.get<User[]>('/users')
        return data
    } catch (error: any) {
        throw Error(error)
    }
} 