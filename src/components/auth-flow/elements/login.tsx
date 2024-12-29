import { useState } from 'react';
import { api } from '../../../api/general-bridge';
import { TyMailAddress } from '../../../types/basic';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await api.auth.signInEmailAndPassword({
      email: email as TyMailAddress,
      password,
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Logged in successfully!');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleEmailLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
