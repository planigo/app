import { Box } from '@mui/material'
import React from 'react'

type HourItemProps = {
    day: string
    start: string
    end: string
}

const HourItem = ({ day, start, end }: HourItemProps) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{day}</span>
            <Box sx={{ display: 'flex' }}>
                {start} - {end}
            </Box>
        </Box>
    )
}

export default HourItem