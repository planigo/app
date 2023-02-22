import { Reservation, ReservationDate, Slot } from '@/models/reservation.model'
import React from 'react'
import dayjs from 'dayjs'

import dynamic from "next/dynamic";
import { Box, Button, Paper, Tooltip } from '@mui/material';
import { HOUR_MINUTES_FORMAT, TEXTUAL_DATE_FORMAT } from '@/config/dayjs';
import { getReservationDateHour } from '@/helpers/reservation.helper';
import { useReservationStore } from '@/store/reservation.store'


type ReservationSlotsScheduleProps = {
    reservationSlots: Reservation[]
}

const ReservationSlotsSchedule = ({ reservationSlots }: ReservationSlotsScheduleProps) => {
    const setReservationDateChose = useReservationStore((state) => state.setReservationDateChose)
    const setIsReservationChosen = useReservationStore((state) => state.setIsReservationChosen)


    const chooseReservationHour = (date: string, slot: Slot) => {
        const reservationDate: ReservationDate = {
            date,
            slot
        }
        setReservationDateChose(reservationDate)
        setIsReservationChosen(true)
    }

    return <Paper sx={{
        display: "flex",
        my: 2,
        p: 2,
        gap: 3
    }}>
        {reservationSlots.map((r: Reservation) => (
            <Box
                key={r.date}
                sx={{
                    display: "flex",
                }}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}>
                    <p>{dayjs(r.date).format(TEXTUAL_DATE_FORMAT)}</p>
                    {r.slots
                        && r.slots.map((s: Slot) => (
                            // <Tooltip disableFocusListener={!s.isAvailable} disableTouchListener={!s.isAvailable} title="on verra ça plus tard">
                            <>
                                <Button
                                    onClick={() => chooseReservationHour(r.date, s)}
                                    disabled={!s.isAvailable}
                                    size="small"
                                    color="secondary"
                                    variant="contained"
                                >{dayjs(getReservationDateHour(r.date, s.start)).format(HOUR_MINUTES_FORMAT)}</Button>
                            </>

                            // </Tooltip>
                        ))
                    }
                </Box>
            </Box>
        ))}
    </Paper>

}

export default dynamic(() => Promise.resolve(ReservationSlotsSchedule), { ssr: false })
