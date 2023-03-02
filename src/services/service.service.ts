import { axiosInstance } from "@/config/axios"
import { Service, ServiceCreate } from "@/models/service.model"
import { useMutation } from "react-query"

export const getServicesByShopId = async (shopId: string): Promise<Service[]> => {
    try {
        const { data } = await axiosInstance.get<Service[]>(`/services/shop/${shopId}`)
        return data || []
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

export const useCreateServiceMutation = (onSuccess: () => void) =>
    useMutation({
        mutationKey: "createService",
        mutationFn: async (newService: ServiceCreate) => {
            await axiosInstance.post(`/services`, newService);
        },
        onSuccess: () => onSuccess(),
    });
