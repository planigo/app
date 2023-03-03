import router from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Container,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useCreateCustomerMutation } from "@/services/users.service";
import { Poppins } from "@next/font/google";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const schema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({
      message: "Le format de l'adresse mail doit être valide",
    }),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
      });
    }
  });

export type FormRegisterSchemaType = z.infer<typeof schema>;
const Register = ({
  closeModal,
  openSnackbar,
}: {
  closeModal: () => void;
  openSnackbar: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterSchemaType>({
    resolver: zodResolver(schema),
  });

  const {
    mutate: createCustomer,
    isError,
    isLoading,
  } = useCreateCustomerMutation({
    onSuccess: () => {
      openSnackbar();
      closeModal();
    },
  });

  const onSubmit = (data: FormRegisterSchemaType) => {
    createCustomer(data);
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
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
          {isError && (
            <Alert severity="error">L&apos;email est déjà utilisée</Alert>
          )}
          <TextField
            id="standard-basic"
            className="log-in-input"
            label="Prénom"
            variant="standard"
            type="text"
            error={!!errors.firstName}
            helperText={errors.firstName?.message as string}
            required
            disabled={isLoading}
            {...register("firstName")}
          />
          <TextField
            id="standard-basic"
            className="log-in-input"
            label="Nom"
            variant="standard"
            type="text"
            error={!!errors.lastName}
            helperText={errors.lastName?.message as string}
            {...register("lastName")}
            disabled={isLoading}
            required
          />
          <TextField
            id="standard-basic"
            className="log-in-input"
            label="Email"
            variant="standard"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message as string}
            {...register("email")}
            disabled={isLoading}
            required
          />
          <TextField
            id="standard-basic"
            className="log-in-input"
            label="Mot de passe"
            variant="standard"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message as string}
            {...register("password")}
            disabled={isLoading}
            required
          />
          <TextField
            id="standard-basic"
            className="log-in-input"
            label="Confirmation mot de passe"
            variant="standard"
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message as string}
            {...register("confirmPassword")}
            disabled={isLoading}
            required
          />
          <Button variant="outlined" type="submit" id="log-in-button-submit">
            {isLoading ? <CircularProgress size={25} /> : "Valider"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
