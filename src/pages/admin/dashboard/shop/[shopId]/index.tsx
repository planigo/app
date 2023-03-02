import HourModal from '@/components/backoffice/HourModal'
import ServiceModal from '@/components/backoffice/ServiceModal'
import { getWeekday } from '@/config/dayjs'
import { Hour } from '@/models/hour.model'
import { AdminDetailedReservation } from '@/models/reservation.model'
import { Service } from '@/models/service.model'
import { getHoursByShopId } from '@/services/hour.service'
import { getSlotsBookedFilteredByShop } from '@/services/reservation.service'
import { getServicesByShopId } from '@/services/service.service'
import { formatPrice } from '@/utils/format.utils'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type AdminShopDetailsProps = {
  shopServices: Service[]
  reservations: AdminDetailedReservation[]
  shopHours: Hour[]
  shopId: string
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const shopId: string = query.shopId as string
  const shopServices = await getServicesByShopId(shopId)
  const reservations = await getSlotsBookedFilteredByShop(shopId)
  const shopHours = await getHoursByShopId(shopId)
  return {
    props: {
      shopServices,
      reservations,
      shopHours,
      shopId
    }
  }
}

const AdminShopDetailsPage = ({ shopServices, reservations, shopHours, shopId }: AdminShopDetailsProps) => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isHourModalOpen, setIsHourModalOpen] = useState(false)

  const navigateToServiceDetailsPage = (serviceId: string) => {
    console.log('navigate to detail service', serviceId)
  }

  const deleteService = (serviceId: string) => {
    console.log('delete service', serviceId)
  }

  return (
    <>
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
              shopServices.length
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
            {reservations.length
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
            shopHours.length
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
    </>
  )
}

export default AdminShopDetailsPage