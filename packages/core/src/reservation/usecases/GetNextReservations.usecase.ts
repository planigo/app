import type { Reservation } from "../domain/models/Reservation.model";
import type { ReservationServicePort } from "../domain/ports/ReservationService.port";

export class GetNextReservations {
    static async execute(reservationService: ReservationServicePort, payload: { shopId: string }): Promise<Reservation[]> {
        return reservationService.getNextReservationsSlots(payload.shopId)
    }
}