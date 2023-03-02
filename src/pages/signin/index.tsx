import { useState } from 'react';
import router, { useRouter } from 'next/router';
import { useForm} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button } from '@mui/material';
import { registerUser } from '@/services/users.service';
import { UserPayload } from '@/models/user.model';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})
.superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
});

const SigninPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    const UserPayload = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    registerUser(UserPayload);
    router.push('/login');
  };
  
  return (
    <div id="log-in-container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField id="standard-basic" className="log-in-input" label="Prénom" variant="standard"
          type="text" {...register("firstName")} required />
          {errors.firstName?.message && <p className='error-message'>{errors.firstName?.message as string}</p>}
        <TextField id="standard-basic" className="log-in-input" label="Nom" variant="standard"
          type="text" {...register("lastName")} required />
          {errors.lastName?.message && <p className='error-message'>{errors.lastName?.message as string}</p>}
        <TextField id="standard-basic" className="log-in-input" label="Email" variant="standard"
          type="email" {...register("email")} required />
          {errors.email?.message && <p className='error-message'>{errors.email?.message as string}</p>}
        <TextField id="standard-basic" className="log-in-input" label="Mot de passe" variant="standard"
          type="password" {...register("password")} required />
          {errors.password?.message && <p className='error-message'>{errors.password?.message as string}</p>}
        <TextField id="standard-basic" className="log-in-input" label="Confirmation mot de passe" variant="standard"
          type="password" {...register("confirmPassword")} required />
          {errors.confirmPassword?.message && <p className='error-message'>{errors.confirmPassword?.message as string}</p>}
        <Button variant="outlined" type="submit" id="log-in-button-submit">Valider</Button>
      </form>
    </div>
  );
};

export default SigninPage;

