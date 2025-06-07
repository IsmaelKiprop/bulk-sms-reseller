import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../Utils/BaseUrl';
import Swal from 'sweetalert2';

function ResetPassword() {
  const [formValues, setFormValues] = useState({
    password: '',
    confirm_password: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL path
    const pathname = location.pathname;
    const tokenPattern = /reset-password\/([^\/]+)/;
    const match = pathname.match(tokenPattern);
    
    if (match && match[1]) {
      setToken(match[1]);
    } else {
      setError('Invalid or missing reset token');
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (formValues.password !== formValues.confirm_password) {
      setError('Passwords do not match');
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please make sure your passwords match',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    if (formValues.password.length < 8) {
      setError('Password must be at least 8 characters long');
      Swal.fire({
        icon: 'error',
        title: 'Password too short',
        text: 'Password must be at least 8 characters long',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Make API request to reset password
      const response = await axios.post(`${BASE_URL}/reset-password/confirm/`, {
        token: token,
        new_password: formValues.password,
        confirm_password: formValues.confirm_password
      });
      
      console.log('Password reset successful:', response.data);
      
      Swal.fire({
        icon: 'success',
        title: 'Password Reset Successful',
        text: 'Your password has been updated. You can now login with your new password.',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        // Redirect to login
        navigate('/login');
      });
    } catch (err) {
      console.error('Password reset error:', err);
      
      // Extract error message from response
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message || 
                          err.response?.data?.error ||
                          'Failed to reset password. The link may be expired or invalid.';
                          
      setError(errorMessage);
      
      // Check for token expiration or invalid token
      if (errorMessage.includes('expired') || errorMessage.includes('invalid')) {
        setIsTokenExpired(true);
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Reset Failed',
        text: errorMessage,
        footer: err.response?.status ? `Error code: ${err.response.status}` : '',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your new password below
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
            
            {isTokenExpired && (
              <div className="mt-3 text-center">
                <Link 
                  to="/forgot-password" 
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  Request a new reset link
                </Link>
              </div>
            )}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                  value={formValues.password}
                  onChange={handleChange}
                  minLength="8"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {passwordVisible ? (
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    )}
                    {passwordVisible ? (
                      <path d="M8.817 11.887l-2.517 2.516a9.958 9.958 0 01-1.817-4.403C5.438 5.96 7.72 3 10 3c.797 0 1.593.127 2.363.38l-1.309 1.308A4 4 0 008.817 11.887z" />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M10 3c-4.478 0-8.268 2.943-9.542 7a10.025 10.025 0 0015.084 5.975 10.016 10.016 0 004-5.975C18.268 5.943 14.478 3 10 3zm0 12.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative mb-4">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type={passwordVisible ? "text" : "password"}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formValues.confirm_password}
                onChange={handleChange}
                minLength="8"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || isTokenExpired}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isTokenExpired ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </>
              ) : "Reset Password"}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-sm text-center">
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800">
            Back to login
          </Link>
          <span className="mx-2">•</span>
          <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-800">
            Request new reset link
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword; 