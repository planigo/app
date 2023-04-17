import React from 'react'

import { Hour } from '@planigo/core/lib/shopping/domain/models/Hour.model'
import { Paper } from '@mui/material'

import HourItem from './HourItem'
import { weekdays } from '../../config/dayjs'

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
        {hours.map(hour =>
          <HourItem
            key={hour.id}
            day={weekdays[hour.day - 1]}
            start={hour.start}
            end={hour.end} />
        )}
      </Paper>
    </article>
  )
}

export default ShopHours