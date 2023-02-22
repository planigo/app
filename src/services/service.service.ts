import { axiosInstance } from "@/config/axios"
import { Service } from "@/models/service.model"

export const getServicesByShopId = async (shopId: string): Promise<Service[]> => {
    try {
        const { data } = await axiosInstance.get<Service[]>(`/services/shop/${shopId}`)
        return data
    } catch (error: any) {
        throw Error(error)
    }
}

export const getServiceById = async (serviceId: string) => {
    try {
        const { data } = await axiosInstance.get<Service>(`/services/${serviceId}`)
        return data
    } catch (error: any) {
        throw Error(error)
    }
}