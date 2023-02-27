import { BookedReservation } from '@/models/reservation.model'
import { RESERVATION_DATE_FORMAT } from '@/config/dayjs'
import { getReservationBookedByUser } from '@/services/reservation.service'
import { Paper } from '@mui/material'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'



const UserReservationsPage = () => {
  const [bookedReservations, setBookedReservations] = useState<BookedReservation[]>([])
  useEffect(() => {
    async function getData() {
      // Wait user info in store
      const bookedReservations = await getReservationBookedByUser("b43a2594-a669-11ed-b5c1-0242ac150002")
      setBookedReservations(bookedReservations)
    }
    getData()
  }, [])

  return (
    <div>
      {bookedReservations.map(reservation => (
        <Paper sx={{ p: 4, my: 2 }} key={reservation.reservationId}>
          <strong>{dayjs(reservation.start).format(RESERVATION_DATE_FORMAT)}</strong>
          <p>Boutique: {reservation.shopName}</p>
          <p>Prestation: {reservation.serviceName}</p>
          <p>Prix: {new Intl.NumberFormat('fr', { style: 'currency', currency: 'EUR' }).format(reservation.price)}</p>
          <p>Temps: {reservation.duration} minutes</p>
        </Paper>
      ))}
    </div>
  )
}

export default UserReservationsPage