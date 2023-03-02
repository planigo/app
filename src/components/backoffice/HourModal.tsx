import { LOCALE, weekdays, FULL_HOUR_FORMAT, HOUR_MINUTES_FORMAT, RESERVATION_DATE_FORMAT } from "@/config/dayjs";
import { Modal, Box, Typography, Button, Select, MenuItem, TextField } from "@mui/material";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { CreateHour, Hour } from "@/models/hour.model";
import { useCreateHourMutation } from "@/services/hour.service";
import dayjs from "dayjs";

type HourModalProps = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    shopId: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const HourModal = ({ isModalOpen, setIsModalOpen, shopId }: HourModalProps) => {
    const [hour, setHour] = useState<Record<string, any>>({
        day: 1,
        start: dayjs(),
        end: dayjs().add(2, "hour"),
    })


    const { mutate: createHour } = useCreateHourMutation(() => {
        setIsModalOpen(false)

    });

    const submit = () => {
        const newHour: CreateHour = {
            day: hour.day,
            start: dayjs(hour.start).format(FULL_HOUR_FORMAT),
            end: dayjs(hour.end).format(FULL_HOUR_FORMAT),
            shop_id: shopId

        }
        createHour(newHour)
    };

    const setDay = (e: any) => {
        setHour(prev => ({ ...prev, day: e.target.value }))
    }

    const setStartTime = (newDate: any) => {
        setHour(prev => ({ ...prev, start: dayjs(newDate) }))
    }

    const setEndTime = (newDate: any) => {
        setHour(prev => ({ ...prev, end: dayjs(newDate) }))
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Ajouter un Créneau
                </Typography>
                <Box sx={{
                    my: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <Select
                        id="days"
                        label="Jour"
                        variant="standard"
                        onChange={setDay}
                    >
                        {
                            weekdays.map((day, index) => <MenuItem
                                key={index}
                                value={index + 1}>{day}
                            </MenuItem>)
                        }
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={LOCALE}>
                        <TimePicker
                            renderInput={(props: any) => <TextField {...props} variant="standard" />}
                            label="Début"
                            value={hour.start}
                            onChange={setStartTime}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={LOCALE}>
                        <TimePicker
                            renderInput={(props: any) => <TextField {...props} variant="standard" />}
                            label="Fin"
                            value={hour.end}
                            onChange={setEndTime}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{
                    mt: 2,
                    textAlign: 'right'
                }}>
                    <Button onClick={() => submit()}>Ajouter</Button>
                </Box>
            </Box >
        </Modal >
    )
}

export default HourModal