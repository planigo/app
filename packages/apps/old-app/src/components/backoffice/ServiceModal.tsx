import { ServiceCreate } from "@/models/service.model";
import { useCreateServiceMutation } from "@/services/service.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ServiceModalProps = {
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

const ServiceModal = ({ isModalOpen, setIsModalOpen, shopId }: ServiceModalProps) => {
    const schema = z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        duration: z.number()
    })

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
    });
    const { mutate: createService } = useCreateServiceMutation(() => {
        setIsModalOpen(false)
        reset()
    });

    const submit = async (serviceData: any) => {
        const newService: ServiceCreate = {
            name: serviceData.name,
            description: serviceData.description,
            price: serviceData.price,
            duration: serviceData.duration,
            shop_id: shopId
        }

        createService(newService)

    };


    return (
        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Ajouter une prestation
                </Typography>
                <form onSubmit={handleSubmit(submit)}>
                    <Box sx={{
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <TextField
                            label="Nom"
                            variant="standard"
                            type="text"
                            {...register("name")}
                        />
                        <TextField
                            label="Description"
                            variant="standard"
                            type="text"
                            {...register("description")}
                        />
                        <TextField
                            label="Prix"
                            variant="standard"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            {...register("price", { valueAsNumber: true })}
                        />
                        <TextField
                            label="Durée"
                            variant="standard"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            {...register("duration", { valueAsNumber: true })}
                        />
                    </Box>
                    <Box sx={{
                        mt: 2,
                        textAlign: 'right'
                    }}>
                        <Button type="submit">Ajouter</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default ServiceModal