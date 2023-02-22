export type Reservation = {
    date: string
    slots: Slot[]
}

export type Slot = {
    reservationId: string
    start: string
    end: string
    duration: number
    isAvailable: boolean
}

export type ReservationRequest = {
    shopId: string
    serviceId: string
    start: string
    userId: string
}