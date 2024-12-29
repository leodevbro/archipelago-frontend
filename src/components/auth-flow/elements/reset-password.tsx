import { useState } from 'react';
import { api } from '../../../api/general-bridge';
import { TyMailAddress } from '../../../types/basic';

export const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordResetMailSent, setPasswordResetMailSent] = useState(false);

  const handlePasswordReset = async () => {
    setPasswordResetMailSent(false);
    const { error, data } = await api.auth.sendResetPasswordEmail(
      email as TyMailAddress
    );
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      console.log(data);
      setMessage('Check your email for the password reset link!');
      setPasswordResetMailSent(true);
    }
  };

  const handlePasswordReset2 = async () => {
    const { error: verifyError } = await api.auth.verifyOtp({
      email,
      token,
      type: 'recovery',
    });
    if (verifyError) {
      setMessage(`Error verifying OTP: ${verifyError.message}`);
      return;
    }

    const { error: updateError } = await api.auth.updateUser({
      password: newPassword,
    });
    if (updateError) {
      setMessage(`Error updating password: ${updateError.message}`);
    } else {
      setMessage('Password reset successfully!');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <form>
        {/* step1 */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="button" onClick={() => handlePasswordReset()}>
          Reset Password
        </button>

        {/* step2 */}

        {passwordResetMailSent && (
          <div>
            <label htmlFor="token">Token:</label>
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => handlePasswordReset2()}>
              Step2 Reset Password
            </button>
          </div>
        )}
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};
