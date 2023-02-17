import { axiosInstance } from "@/config/axios"
import { Reservation } from "@/models/reservation.model"

export const getNextReservationSlots = async (shopId: string) => {
    try {
        const { data } = await axiosInstance.get<Reservation[]>(`/reservation/slots/${shopId}`)
        return data
    } catch (error: any) {
        throw Error(error)
    }
}