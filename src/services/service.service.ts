import { axiosInstance } from "@/config/axios"
import { Service } from "@/models/service.model"

export const getServicesByShopId = async (shopId: string): Promise<Service[]> => {
    try {
        const { data } = await axiosInstance.get<Service[]>(`/services/${shopId}`)
        return data
    } catch (error: any) {
        throw Error(error)
    }
} 