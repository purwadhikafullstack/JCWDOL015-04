// src/services/passwordService.ts
export const requestPasswordReset = async (email: string) => {
    const response = await fetch('http://localhost:8000/api/user/request-password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.json();
  };
  
  export const resetPassword = async (token: string, newPassword: string, confirmNewPassword: string) => {
    const response = await fetch('http://localhost:8000/api/user/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword, confirmNewPassword }),
    });
    return response.json();
  };
  