import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TimezoneSelect from 'react-timezone-select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../Utils/BaseUrl';
import { generateUserMetadata } from '../Utils/UserMetadata';

const UserForm = () => {
  const [mode, setMode] = useState('signup');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    companyName: '',
    phoneNumber: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    timezone: 'Africa/Nairobi', 
    industry: '',
    country: 'Kenya',
    city: '',
    resetEmail: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);

  // Log BASE_URL to confirm it's loaded correctly
  console.log('API Base URL:', BASE_URL);

  const defaultSubscription = {
    plan: 'demo',
    start_date: 'now',
    end_date: 'now + 3days',
    auto_renew: false,
    features: ['5 free sms'],
    price: 0,
    currency: 'KES',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimezoneChange = (selectedTimezone) => {
    setFormValues((prev) => ({
      ...prev,
      timezone: selectedTimezone.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (forgotPassword) {
      setLoading(true);
      setResetRequested(true);
      try {
        await axios.post(`${BASE_URL}/reset-password/request/`, {
          email: formValues.resetEmail
        });
        setResetSent(true);
      } catch (error) {
        console.error('Password reset error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to send reset email. Please try again.',
          confirmButtonColor: '#3085d6',
        });
        setResetRequested(false);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (mode === 'signup') {
      // Validation
      if (formValues.password !== formValues.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Passwords do not match',
          text: 'Please make sure your passwords match',
          confirmButtonColor: '#3085d6',
        });
        return;
      }

      // Generate structured metadata using our utility
      const metadata = generateUserMetadata({
        timezone: formValues.timezone,
        industry: formValues.industry,
        city: formValues.city,
        country: formValues.country
      });

      // Registration data
      const formData = {
        company_name: formValues.companyName,
        phone_number: formValues.phoneNumber,
        email: formValues.email,
        password: formValues.password,
        metadata: metadata
      };

      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/register/`, formData);
        
        console.log('Registration successful:', response.data);
        
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Your account has been created successfully!',
          html: `
            <div class="text-left">
              <p>Thank you for registering! Please check your email for verification instructions.</p>
              <p><strong>Company:</strong> ${formValues.companyName}</p>
              <p><strong>Email:</strong> ${formValues.email}</p>
              ${response.data.message ? `<p><strong>Message:</strong> ${response.data.message}</p>` : ''}
            </div>
          `,
          confirmButtonColor: '#3085d6',
        }).then(() => {
          // Redirect to login
          setMode('signin');
        });
      } catch (error) {
        console.error('Registration error:', error);
        
        // Extract detailed error information
        let errorMessage = 'Registration failed. Please try again.';
        let errorDetails = '';
        
        if (error.response?.data) {
          // Handle different error response formats
          if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.error) {
            errorMessage = error.response.data.error;
          } else if (Object.keys(error.response.data).length > 0) {
            // Handle field-specific errors (common in Django REST Framework)
            errorMessage = 'Please fix the following errors:';
            errorDetails = Object.entries(error.response.data)
              .map(([field, errors]) => {
                // If errors is an array, join them
                const errorText = Array.isArray(errors) ? errors.join(', ') : errors;
                return `<p><strong>${field}:</strong> ${errorText}</p>`;
              })
              .join('');
          }
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          html: `
            <div class="text-left">
              <p>${errorMessage}</p>
              ${errorDetails ? errorDetails : ''}
            </div>
          `,
          footer: error.response?.status ? `Error code: ${error.response.status}` : '',
          confirmButtonColor: '#3085d6',
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Login
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/login/`, {
          company_name: formValues.companyName || formValues.email,
          password: formValues.password
        });
        
        console.log('Login response:', response.data);
        
        // Save token to localStorage or use HttpOnly cookies
        localStorage.setItem('auth_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        // Store user info
        localStorage.setItem('user_info', JSON.stringify({
          user_id: response.data.user_id,
          company_name: response.data.company_name,
          email: response.data.email,
          phone_number: response.data.phone_number,
          tokens_balance: response.data.tokens_balance,
          is_email_verified: response.data.is_email_verified
        }));
        
        // Toast notification
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome back, ${response.data.company_name}!`,
          html: `
            <div class="text-left">
              <p><strong>User ID:</strong> ${response.data.user_id}</p>
              <p><strong>Company:</strong> ${response.data.company_name}</p>
              <p><strong>Email:</strong> ${response.data.email}</p>
              <p><strong>SMS Balance:</strong> ${response.data.tokens_balance || 0}</p>
              <p><strong>Email Verified:</strong> ${response.data.is_email_verified ? 'Yes' : 'No'}</p>
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: 'Continue to Dashboard',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          // Redirect to dashboard
          navigate('/dashboard');
        });
      } catch (error) {
        console.error('Login error:', error);
        
        // Extract error details from response
        const errorMessage = error.response?.data?.detail || 
                            error.response?.data?.message || 
                            error.response?.data?.error ||
                            'Login failed. Please check your credentials and try again.';
        
        // Display more detailed error information
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
          footer: error.response?.status ? `Error code: ${error.response.status}` : '',
          confirmButtonColor: '#3085d6',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleForgotPasswordReset = () => {
    setForgotPassword(false);
    setResetSent(false);
    setResetRequested(false);
    setFormValues(prev => ({
      ...prev,
      resetEmail: ''
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300">
        {forgotPassword ? (
          <>
            <button 
              onClick={() => setForgotPassword(false)}
              className="mb-4 flex items-center text-primary hover:text-primary-dark dark:text-blue-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to login
            </button>
            
            <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Reset Password
            </h2>
            
            {resetSent ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  If an account exists with {formValues.resetEmail}, we've sent password reset instructions.
                </p>
                <button
                  onClick={handleForgotPasswordReset}
                  className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                  <div className="relative">
                  <input
                    type="email"
                    name="resetEmail"
                    id="resetEmail"
                    value={formValues.resetEmail}
                    onChange={handleChange}
                    className="block w-full px-4 pt-5 pb-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary peer"
                    placeholder=" "
                    required
                  />
                    <label 
                      htmlFor="resetEmail" 
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >
                      Email
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={resetRequested}
                  className={`w-full ${resetRequested ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'} text-white py-3 px-4 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : resetRequested ? "Email Sent" : "Send Reset Instructions"}
                </button>
              </form>
            )}
          </>
        ) : (
          <>
            {/* Toggle Sign Up / Sign In */}
            <div className="flex justify-center mb-6 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <button
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                  mode === 'signup'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setMode('signup')}
              >
                Sign Up
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                  mode === 'signin'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setMode('signin')}
              >
                Sign In
              </button>
            </div>

            <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {mode === 'signup' ? 'Create an Account' : 'Welcome Back'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className={`grid ${mode === 'signup' ? 'grid-cols-1 md:grid-cols-2 gap-6' : ''}`}>
              {mode === 'signup' && (
                <>
                    <div className="relative">
                    <input
                      type="text"
                      name="companyName"
                        id="companyName"
                      value={formValues.companyName}
                      onChange={handleChange}
                        className="block w-full px-4 pt-5 pb-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary peer"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="companyName" 
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      >
                        Company Name
                      </label>
                  </div>

                    <div className="relative">
                      <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] left-4">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={'ke'}
                      value={formValues.phoneNumber}
                      onChange={(phone) =>
                        setFormValues((prev) => ({ ...prev, phoneNumber: phone }))
                      }
                        containerClass="w-full mt-4"
                      inputStyle={{
                        width: '100%',
                          height: '50px',
                        fontSize: '16px',
                        paddingLeft: '48px',
                          paddingTop: '16px',
                        borderRadius: '0.5rem',
                        backgroundColor: '#F9FAFB',
                      }}
                      dropdownStyle={{
                        width: '300px',
                      }}
                      inputProps={{
                        name: 'phoneNumber',
                        required: true,
                        className: 'dark:bg-gray-700 dark:text-white',
                      }}
                    />
                  </div>

                    <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                        id="fullName"
                      value={formValues.fullName}
                      onChange={handleChange}
                        className="block w-full px-4 pt-5 pb-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary peer"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="fullName" 
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      >
                        Full Name
                      </label>
                  </div>
                </>
              )}

                <div className="relative">
                <input
                  type="email"
                  name="email"
                    id="email"
                  value={formValues.email}
                  onChange={handleChange}
                    className="block w-full px-4 pt-5 pb-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary peer"
                    placeholder=" "
                  required
                />
                  <label 
                    htmlFor="email" 
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >
                    Email
                  </label>
              </div>

                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formValues.password}
                    onChange={handleChange}
                    className="block w-full px-4 pt-5 pb-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary pr-10 peer"
                    placeholder=" "
                    required
                  />
                  <label 
                    htmlFor="password" 
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  >
                    {passwordVisible ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
              </div>

              {mode === 'signup' && (
                <>
                    <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                        id="confirmPassword"
                      value={formValues.confirmPassword}
                      onChange={handleChange}
                        className="block w-full px-4 pt-5 pb-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary peer"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="confirmPassword" 
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      >
                        Confirm Password
                      </label>
                  </div>

                    <div className="relative">
                      <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] left-4">
                      Timezone
                    </label>
                    <TimezoneSelect 
                      value={formValues.timezone || 'Africa/Nairobi'} 
                      onChange={handleTimezoneChange} 
                        className="w-full rounded-lg mt-4"
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: '#D1D5DB',
                            padding: '12px 0px 0px 0px',
                          backgroundColor: '#F9FAFB',
                          borderRadius: '0.5rem',
                            minHeight: '50px',
                        }),
                        menu: (base) => ({
                          ...base,
                          borderRadius: '0.5rem',
                          overflow: 'hidden',
                        }),
                      }}
                    />
                  </div>

                    <div className="relative">
                      <select
                        name="industry"
                        id="industry"
                        value={formValues.industry}
                        onChange={handleChange}
                        className="block w-full px-4 pt-5 pb-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary appearance-none peer"
                      >
                        <option value="">Select Industry</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="other">Other</option>
                      </select>
                      <label 
                        htmlFor="industry" 
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      >
                        Industry
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="country"
                        id="country"
                        value={formValues.country}
                        onChange={handleChange}
                        className="block w-full px-4 pt-5 pb-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary peer"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="country" 
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      >
                        Country
                      </label>
                  </div>

                    <div className="relative">
                    <input
                      type="text"
                      name="city"
                        id="city"
                      value={formValues.city}
                      onChange={handleChange}
                        className="block w-full px-4 pt-5 pb-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary peer"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="city" 
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      >
                        City
                      </label>
                  </div>
                </>
              )}
              </div>

              {mode === 'signin' && (
                <div className="flex items-center justify-between mt-2 mb-2">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForgotPassword(true)}
                    className="text-sm font-medium text-primary hover:text-primary-dark dark:text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {mode === 'signup' ? 'Create Account' : 'Sign In'}
              </button>
            </form>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-primary hover:text-primary-dark dark:text-blue-400 font-medium hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-primary hover:text-primary-dark dark:text-blue-400 font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserForm;