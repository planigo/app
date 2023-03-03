import HourModal from '@/components/backoffice/HourModal'
import ServiceModal from '@/components/backoffice/ServiceModal'
import { getWeekday } from '@/config/dayjs'
import { useGetServicesByShopIdQuery } from '@/services/service.service'
import { formatPrice } from '@/utils/format.utils'
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useGetSlotsBookedFilteredByShopQuery } from '@/services/reservation.service'
import { useGetHoursByShopIdQuery } from '@/services/hour.service'

const AdminShopDetailsPage = () => {
  const router = useRouter()
  const shopId = router.query.shopId as string
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isHourModalOpen, setIsHourModalOpen] = useState(false)

  const { data: reservations, isLoading: isReservationLoading } = useGetSlotsBookedFilteredByShopQuery(shopId)
  const { data: shopServices, isLoading: isShopServicesLoading } = useGetServicesByShopIdQuery(shopId)
  const { data: shopHours, isLoading: isShopHoursLoading } = useGetHoursByShopIdQuery(shopId)

  const navigateToServiceDetailsPage = (serviceId: string) => {
    console.log('navigate to detail service', serviceId)
  }

  const deleteService = (serviceId: string) => {
    console.log('delete service', serviceId)
  }

  return (
    <Box sx={{ mt: 10 }}>
      <h2>Les prestations</h2>
      <Button onClick={() => setIsServiceModalOpen(true)}>Ajouter une prestation</Button>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Service ID</TableCell>
              <TableCell>Prestation</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Durée</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (!isShopServicesLoading && shopServices)
                ? shopServices.map((service) => (
                  <TableRow
                    key={service.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {service.id}
                    </TableCell>
                    <TableCell>
                      {service.name}
                    </TableCell>
                    <TableCell>
                      {service.description}
                    </TableCell>
                    <TableCell>
                      {formatPrice(service.price)}
                    </TableCell>
                    <TableCell>
                      {service.duration} minutes
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => navigateToServiceDetailsPage(service.id)}>Details</Button>
                      <Button onClick={() => deleteService(service.id)}>Supprimer</Button>
                    </TableCell>
                  </TableRow>
                ))
                : <p>Pas de service</p>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <h2>Les réservations</h2>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Reservation ID</TableCell>
              <TableCell>Heure de début</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Prestation</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Durée</TableCell>
              <TableCell>Annulée ?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!isReservationLoading && reservations)
              ? reservations.map((reservation) => (
                <TableRow
                  key={reservation.reservationId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {reservation.reservationId}
                  </TableCell>
                  <TableCell>
                    {reservation.start}
                  </TableCell>
                  <TableCell>
                    {reservation.firstname} {reservation.lastname}
                  </TableCell>
                  <TableCell>
                    {reservation.serviceName}
                  </TableCell>
                  <TableCell>
                    {reservation.duration} minutes
                  </TableCell>
                  <TableCell>
                    {formatPrice(reservation.price)}
                  </TableCell>
                  <TableCell>
                    {reservation.isCancelled ? <span>Oui</span> : <span>Non</span>}
                  </TableCell>
                </TableRow>
              ))
              : <p>Pas de reservation</p>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <h2>Les horaires</h2>
      <Button onClick={() => setIsHourModalOpen(true)}>Ajouter Horaire</Button>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>Créneau ID</TableCell>
            <TableCell>Jour</TableCell>
            <TableCell>Début</TableCell>
            <TableCell>Fin</TableCell>
            <TableCell>Shop ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            (!isShopHoursLoading && shopHours)
              ? shopHours.map((hour) => (
                <TableRow
                  key={hour.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {hour.id}
                  </TableCell>
                  <TableCell>
                    {getWeekday(hour.day)}
                  </TableCell>
                  <TableCell>
                    {hour.start}
                  </TableCell>
                  <TableCell>
                    {hour.end}
                  </TableCell>
                  <TableCell>
                    {hour.shop_id}
                  </TableCell>
                  <TableCell>
                    <Button>Modifier</Button>
                    <Button>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))
              : <p>Pas de service</p>
          }
        </TableBody>
      </TableContainer>
      <ServiceModal
        isModalOpen={isServiceModalOpen}
        setIsModalOpen={setIsServiceModalOpen}
        shopId={shopId}
      />
      <HourModal
        isModalOpen={isHourModalOpen}
        setIsModalOpen={setIsHourModalOpen}
        shopId={shopId}
      />
    </Box>
  )
}

export default AdminShopDetailsPage
