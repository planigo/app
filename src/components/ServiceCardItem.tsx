import React from 'react'
import Link from 'next/link';
import { Service } from '@/models/service.model'
import { Button, Paper } from '@mui/material'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

type ServiceCardProps = {
  shopId: string
  service: Service
  nextAvailableReservationSlot: string
}

export const ServiceCardItem = ({ shopId, service, nextAvailableReservationSlot }: ServiceCardProps) => {
  return (
    <section>
      <Paper
        square={true}
        elevation={3}
        sx={{
          p: 1,
          my: 4
        }}>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <p>{new Intl.NumberFormat('fr', { style: 'currency', currency: 'EUR' }).format(service.price)}</p>
        <p><AccessTimeOutlinedIcon /> {service.duration} min</p>
        <div>
          <p>Prochaine dispo le : {nextAvailableReservationSlot}</p>
          <Link href={`/shops/${shopId}/reservation?serviceId=${service.id}`}>
            <Button variant="outlined">Réserver</Button>
          </Link>
        </div>
      </Paper>
    </section>
  )
}

export default ServiceCardItem