import { Hour } from '@/models/hour.model'
import { Paper } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import HourItem from './HourItem'

type ShopHoursProps = {
  hours: Hour[]
}

const ShopHours = ({ hours }: ShopHoursProps) => {
  const weekdays: string[] = dayjs.weekdays(true)
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