import type { Reservation } from "../models/Reservation.model";

export interface ReservationServicePort {
    getNextReservationsSlots: (shopId: string) => Promise<Reservation[]>
}