import { Reservation, Slot } from "@/models/reservation.model"

export const getNextAvailableReservation = (nextReservations: Reservation[]): Reservation | null => {
    const nextReservation: Reservation | undefined = nextReservations.find((reservation: Reservation) => {
        return reservation.slots.length > 0
    })

    if (!nextReservation) {
        return null
    }

    return nextReservation
}

export const getNextAvailableSlot = (slots: Slot[]): Slot | null => {
    const nextAvailableSlot: Slot | undefined = slots.find((slot: Slot) => {
        return slot.isAvailable === true && slot.reservationId === ""
    })
    if (!nextAvailableSlot) {
        return null
    }
    return nextAvailableSlot
}

export const getReservationDateHour = (nextReservationDate: string, slotHour: string): string => {
    return `${nextReservationDate} ${slotHour}`
}
