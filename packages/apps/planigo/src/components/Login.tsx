import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, CircularProgress, Alert, Container } from "@mui/material";
import { useUserStore } from "../store/user.store";
import { Poppins } from "next/font/google";
import { authService } from "../services/Auth.service";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const schema = z.object({
    email: z
        .string()
        .email({ message: "Le format de l'adresse mail doit être valide" }),
    password: z
        .string()
        .min(4, "Le mot de passe doit contenir au moins 4 caractères"),
});

export type FormLoginSchemaType = z.infer<typeof schema>;

const Login = ({ closeModal }: { closeModal: () => void }) => {
    const setCurrentUser = useUserStore((state) => state.setCurrentUser);

    const {
        mutate: login,
        isLoading,
        isError,
    } = authService().useLoginMutation((user) => {
        closeModal();
        setCurrentUser(user);
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLoginSchemaType>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormLoginSchemaType) => {
        login(data);
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            className={poppins.className}
        >
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: 300,
                        height: 250,
                    }}
                >
                    {isError && (
                        <Alert severity="error">
                            La combinaison n&apos;est pas correcte
                        </Alert>
                    )}
                    <TextField
                        id="standard-basic"
                        className="log-in-input"
                        label="Email"
                        variant="standard"
                        type="text"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled={isLoading}
                        {...register("email")}
                    />
                    <TextField
                        id="standard-basic"
                        className="log-in-input"
                        label="Password"
                        variant="standard"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        disabled={isLoading}
                        {...register("password")}
                    />
                    <Button
                        variant="outlined"
                        type="submit"
                        id="log-in-button-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={25} /> : "Valider"}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default Login;
