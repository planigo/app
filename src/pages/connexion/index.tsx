import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, CircularProgress, Alert } from "@mui/material";
import { useLoginMutation, useMeQuery } from "@/services/auth.service";
import { Container } from "@mui/system";
import { useState } from "react";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Le format de l'adresse mail doit être valide" }),
  password: z
    .string()
    .min(4, "Le mot de passe doit contenir au moins 4 caractères"),
});

export type FormLoginSchemaType = z.infer<typeof schema>;

const LoginPage = () => {
  const { mutate: login, isLoading, isError } = useLoginMutation();
  const [trigger, setTrigger] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginSchemaType>({
    resolver: zodResolver(schema),
  });

  useMeQuery(trigger);

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
    >
      <button onClick={() => setTrigger(true)}>me</button>
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            {isLoading ? <CircularProgress size={25} /> : "Submit"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
