import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../Utils/BaseUrl';
import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Make API request to login endpoint
      const response = await axios.post(`${BASE_URL}/login/`, {
        company_name: email, // API expects company_name which can be email too
        password: password
      });
      
      console.log('Login response:', response.data);
      
      // Save auth tokens
      localStorage.setItem('auth_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Store user info
      localStorage.setItem('user_info', JSON.stringify({
        user_id: response.data.user_id,
        company_name: response.data.company_name,
        email: response.data.email,
        phone_number: response.data.phone_number,
        tokens_balance: response.data.tokens_balance || 0,
        is_email_verified: response.data.is_email_verified
      }));
      
      // Display success message with user details
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        html: `
          <div class="text-left">
            <p><strong>Welcome back!</strong> ${response.data.company_name}</p>
            <p><strong>User ID:</strong> ${response.data.user_id}</p>
            <p><strong>Email:</strong> ${response.data.email}</p>
            <p><strong>SMS Balance:</strong> ${response.data.tokens_balance || 0}</p>
            <p><strong>Email Verified:</strong> ${response.data.is_email_verified ? 'Yes' : 'No'}</p>
          </div>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Continue to Dashboard',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        // Navigate to dashboard
        navigate('/dashboard');
      });
    } catch (err) {
      console.error('Login error:', err);
      
      // Extract error message from response
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message || 
                          err.response?.data?.error ||
                          'Invalid email or password. Please try again.';
                          
      // Set error message to display in UI
      setError(errorMessage);
      
      // Also show detailed error in alert
      if (err.response) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
          footer: err.response.status ? `Error code: ${err.response.status}` : '',
          confirmButtonColor: '#3085d6',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Connection Error',
          text: 'Unable to connect to the server. Please check your internet connection.',
          confirmButtonColor: '#3085d6',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              register for a new account
            </Link>
          </p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address or Company Name
              </label>
              <input
                id="email-address"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address or Company Name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login; 