import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button } from '@mui/material';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const LoginPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };
  
  return (
    <div id="log-in-container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField id="standard-basic" className="log-in-input" label="Email" variant="standard"
         type="text" {...register("email")} />
        {errors.email?.message && <p className='error-message'>{errors.email?.message as string}</p>}
        <TextField id="standard-basic" className="log-in-input" label="Password" variant="standard"
         type="password" {...register("password")} />
        {errors.password?.message && <p className='error-message'>{errors.password?.message as string}</p>}
        <Button variant="outlined" type="submit" id="log-in-button-submit">Submit</Button>
      </form>
    </div>
  );
};

export default LoginPage;

