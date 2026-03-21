import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from './authContext';
import { validateCode, generateVerificationCode, storeVerificationCode } from '../../utils/codeGenerator';
import { sendVerificationEmail } from '../../utils/webhookService';

const VerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authorizedUsername } = useAuth();
  
  const email = location.state?.email || '';
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace - go to previous input
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newCode[i] = char;
    });
    setCode(newCode);
    
    // Focus last filled input or first empty
    const lastFilledIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleVerify = async () => {
    const enteredCode = code.join('');
    
    if (enteredCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    // Validate code
    const result = validateCode(enteredCode);
    
    if (!result.valid) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Code is valid - login
    login(email);
    navigate('/admin/dashboard');
  };

  const handleResend = async () => {
    setResending(true);
    setError('');

    try {
      const newCode = generateVerificationCode();
      storeVerificationCode(newCode);
      
      const result = await sendVerificationEmail(newCode, authorizedUsername, email);
      
      if (result.success) {
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        setError('Failed to resend code. Please try again.');
      }
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleBack = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 hero-pattern opacity-50"></div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md border border-white/20"
      >
        {/* Lock icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-display text-white font-bold">
            Enter Verification Code
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            A 6-digit code was sent to {email}
          </p>
        </div>

        {/* Code input boxes */}
        <div className="mb-6">
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            ))}
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-3 px-4 bg-accent hover:bg-accent-light text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify & Login'
          )}
        </button>

        {/* Resend link */}
        <div className="text-center mb-4">
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-accent hover:text-accent-light transition-colors disabled:opacity-50 text-sm"
          >
            {resending ? 'Sending...' : 'Resend Code'}
          </button>
        </div>

        {/* Back link */}
        <div className="text-center">
          <button 
            onClick={handleBack}
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyPage;
