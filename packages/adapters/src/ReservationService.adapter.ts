import { Reservation } from "@planigo/core/lib/reservation/domain/models/Reservation.model"
import { ReservationServicePort } from "@planigo/core/lib/reservation/domain/ports/ReservationService.port"
import { axiosInstance } from "./config/axios"

export function useReservationService(): ReservationServicePort {
    const getNextReservationsSlots = async (shopId: string): Promise<Reservation[]> => {
        const response = await axiosInstance.get<Reservation[]>(`/reservation/slots/${shopId}`)
        return response.data
    }
    return {
        getNextReservationsSlots
    }
}