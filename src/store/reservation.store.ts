import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Reservation, ReservationDate, Slot } from '@/models/reservation.model'

interface ReservationState {
    nextAvailableReservation: Reservation | null
    setNextAvailableReservation: (reservation: Reservation) => void
    nextAvailableSlot: Slot | null
    setNextAvailableSlot: (slot: Slot) => void
    reservationDateChose: ReservationDate | null
    setReservationDateChose: (reservationDate: ReservationDate) => void
    cleanReservationDateChose: () => void
    isReservationChosen: boolean
    setIsReservationChosen: (value: boolean) => void

}

export const useReservationStore = create<ReservationState>()(
    persist((set) => ({
        nextAvailableReservation: null,
        setNextAvailableReservation: (reservation) => {
            set((state) => ({
                nextAvailableReservation: { ...reservation },
            }))
        },
        nextAvailableSlot: null,
        setNextAvailableSlot: (nextSlot) => {
            set((state) => ({
                nextAvailableSlot: { ...nextSlot },
            }))
        },
        reservationDateChose: null,
        setReservationDateChose: (reservationDate: ReservationDate) => {
            set((state) => ({
                reservationDateChose: { ...reservationDate },
            }))
        },
        cleanReservationDateChose: () => {
            set((state) => ({
                reservationDateChose: null,
            }))
        },
        isReservationChosen: false,
        setIsReservationChosen: (value: boolean) => {
            set((state) => ({
                isReservationChosen: value,
            }))
        },
    }), { name: "reservation" })
)


