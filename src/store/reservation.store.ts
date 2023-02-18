import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Reservation, Slot } from '@/models/reservation.model'

interface ReservationState {
    nextAvailableReservation: Reservation | null
    setNextAvailableReservation: (reservation: Reservation) => void
    nextAvailableSlot: Slot | null
    setNextAvailableSlot: (slot: Slot) => void
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
    }), { name: "next-reservation" })
)


