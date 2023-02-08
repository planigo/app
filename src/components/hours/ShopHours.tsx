import { getDayLabel } from '@/helpers/hour.helper'
import { Hour } from '@/models/hour.model'
import { Paper } from '@mui/material'
import React from 'react'
import HourItem from './HourItem'

type ShopHoursProps = {
  hours: Hour[]
}

const ShopHours = ({ hours }: ShopHoursProps) => {
  return (
    <article>
      <Paper
        square={true}
        elevation={3}
        sx={{
          p: 1
        }}>
        <h3>Les horaires d'ouverture</h3>
        {hours.map(hour =>
          <HourItem
            key={hour.id}
            day={getDayLabel(hour.day)}
            start={hour.start}
            end={hour.end} />
        )}
      </Paper>
    </article>
  )
}

export default ShopHours