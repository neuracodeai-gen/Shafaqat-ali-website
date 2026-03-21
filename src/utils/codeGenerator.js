// Code generator utility for verification codes
// Generates 6-digit numeric codes with expiry logic

export const generateVerificationCode = () => {
  // Generate a random 6-digit number (100000-999999)
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeVerificationCode = (code) => {
  const data = {
    code,
    timestamp: Date.now(),
  };
  sessionStorage.setItem('verification_code', JSON.stringify(data));
  return data;
};

export const getStoredVerificationCode = () => {
  try {
    const data = sessionStorage.getItem('verification_code');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading verification code:', error);
    return null;
  }
};

export const clearVerificationCode = () => {
  sessionStorage.removeItem('verification_code');
};

export const isCodeExpired = (timestamp, expiryMinutes = 10) => {
  const now = Date.now();
  const expiryMs = expiryMinutes * 60 * 1000;
  return now - timestamp > expiryMs;
};

export const validateCode = (enteredCode) => {
  const stored = getStoredVerificationCode();
  
  if (!stored) {
    return { valid: false, error: 'No code found. Please request a new code.' };
  }
  
  if (isCodeExpired(stored.timestamp)) {
    clearVerificationCode();
    return { valid: false, error: 'Code expired. Please request a new one.' };
  }
  
  if (enteredCode !== stored.code) {
    return { valid: false, error: 'Invalid code. Please try again.' };
  }
  
  return { valid: true, error: null };
};
