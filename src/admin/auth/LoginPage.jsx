import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from './authContext';
import { generateVerificationCode, storeVerificationCode } from '../../utils/codeGenerator';
import { sendVerificationEmail } from '../../utils/webhookService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { checkAuthorizedEmail, authorizedEmail, authorizedUsername } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');

    // Check if email is authorized
    if (!checkAuthorizedEmail(email)) {
      setError('Unauthorized. Access restricted.');
      return;
    }

    setLoading(true);

    try {
      // Generate verification code
      const code = generateVerificationCode();
      storeVerificationCode(code);

      // Send verification email
      const result = await sendVerificationEmail(code, authorizedUsername, email);

      if (result.success) {
        // Navigate to verification page with email
        navigate('/admin/verify', { state: { email } });
      } else {
        setError('Failed to send code. Please try again.');
      }
    } catch (err) {
      setError('Failed to send code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 hero-pattern opacity-50"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md border border-white/20"
      >
        {/* Logo/Name */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-display text-white font-bold">
            Dr. Shafaqat Ali
          </h1>
          <p className="text-gray-400 mt-2">Admin Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSendCode}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              required
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-accent hover:bg-accent-light text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending Code...
              </>
            ) : (
              'Send Verification Code'
            )}
          </button>
        </form>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Website
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
