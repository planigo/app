import { BookedReservation } from '@/models/reservation.model'
import { RESERVATION_DATE_FORMAT } from '@/config/dayjs'
import { getReservationBookedByUser } from '@/services/reservation.service'
import { Container, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { User } from '@/models/user.model';
import { useUserStore } from '@/store/user.store';



const UserReservationsPage = () => {
  const [bookedReservations, setBookedReservations] = useState<BookedReservation[]>([])
  const currentUser: User = useUserStore((state) => state.currentUser)
  useEffect(() => {
    async function getData() {
      console.dir(currentUser)
      const bookedReservations = await getReservationBookedByUser(currentUser.id)
      setBookedReservations(bookedReservations)
    }
    getData()
  }, [])

  return (
    <Container>
      <h2>Mes réservations</h2>
      <Grid container gap={2}>
        {bookedReservations.map(reservation => (
          <Grid md={3}>
            <Paper sx={{ p: 4, my: 2 }} key={reservation.reservationId}>
              <strong>{dayjs(reservation.start).format(RESERVATION_DATE_FORMAT)}</strong>
              <p>Boutique: {reservation.shopName}</p>
              <p>Prestation: {reservation.serviceName}</p>
              <p>Prix: {new Intl.NumberFormat('fr', { style: 'currency', currency: 'EUR' }).format(reservation.price)}</p>
              <p>Temps: {reservation.duration} minutes</p>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>

  )
}

export default UserReservationsPage