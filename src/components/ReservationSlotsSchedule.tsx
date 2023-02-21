import { Reservation } from '@/models/reservation.model'
import React from 'react'

type ReservationSlotsSchedule = {
    reservationSlots: Reservation[]
}

const ReservationSlotsSchedule = ({ reservationSlots }: ReservationSlotsSchedule) => {
    console.table(reservationSlots)
    return (
        <>
            {reservationSlots && reservationSlots.map((r: Reservation) => {
                <span>{r.date}</span>
            })}
        </>
    )
}

export default ReservationSlotsSchedule