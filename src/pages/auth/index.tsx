import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Autocomplete, TextField, Box } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform login logic here using email and password
    router.push('/'); // Redirect to dashboard page after successful login
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} style={{display : 'flex', alignItems: 'center'}}>
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="current-password"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          id="password"
          label="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
          style={{ marginLeft: '10px' }}
        />
        <Button variant="outlined" type="submit" style={{marginLeft: '10px' }}>Submit</Button>
      </form>
    </div>
  );
};

export default LoginPage;
