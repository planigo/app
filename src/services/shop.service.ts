import { axiosInstance } from "@/config/axios"
import { Shop } from "@/models/shop.model"

export const getShops = async (): Promise<Shop[]> => {
    try {
        const { data } = await axiosInstance.get<Shop[]>('/shops')
        return data
    } catch (error: any) {
        throw Error(error)
    }
} 