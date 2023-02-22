import { axiosInstance } from "@/config/axios"
import { Reservation, ReservationRequest } from "@/models/reservation.model"

export const getNextReservationSlots = async (shopId: string) => {
    try {
        const { data } = await axiosInstance.get<Reservation[]>(`/reservation/slots/${shopId}`)
        return data
    } catch (error: any) {
        throw Error(error)
    }
}

export const makeReservation = async (reservationDemand: ReservationRequest) => {
    try {
        await axiosInstance.post(`/reservation`, {...reservationDemand})
    } catch (error: any) {
        throw Error(error)
    }
}