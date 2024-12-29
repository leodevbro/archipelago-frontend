import { useState } from 'react';
import { api } from '../../../api/general-bridge';
import { TyMailAddress } from '../../../types/basic';

export const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isVerificationSent, setIsVerificationSent] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await api.auth.signUp({
      email: email as TyMailAddress,
      password,
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Verification code sent to your email.');
      setIsVerificationSent(true);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await api.auth.verifyOtp({
      email,
      token: verificationCode,
      type: 'signup',
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Email verified successfully! You can now log in.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {!isVerificationSent ? (
        <form onSubmit={handleSignUp}>
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
          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyEmail}>
          <div>
            <label>Verification Code:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify Email</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};
