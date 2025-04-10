import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TimezoneSelect from 'react-timezone-select';

const UserForm = () => {
  const [mode, setMode] = useState('signup');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    companyName: '',
    phoneNumber: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    timezone: 'Africa/Nairobi', // Set default timezone to match default country (Kenya)
    industry: '',
    country: 'Kenya',
    city: '',
    resetEmail: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [resetSent, setResetSent] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (forgotPassword) {
      console.log('Password reset requested for:', formValues.resetEmail);
      setResetSent(true);
      return;
    }

    if (mode === 'signup') {
      const metadata = {
        subscription: { ...defaultSubscription },
        preferences: {
          timezone: formValues.timezone || '',
          default_sender_id: '',
          notifications: {
            low_balance: '',
            delivery_reports: false,
          },
        },
        business: {
          industry: formValues.industry || '',
          size: '',
          address: {
            city: formValues.city || '',
            country: formValues.country || '',
          },
        },
        api: {
          key: '',
          secret: '',
          allowed_ips: [],
        },
      };

      const formData = {
        company_name: formValues.companyName || '',
        phone_number: formValues.phoneNumber || '',
        full_name: formValues.fullName || '',
        email: formValues.email || '',
        password: formValues.password || '',
        tokens_balance: 0,
        metadata: metadata,
      };

      console.log('Submitted form data:', formData);
    } else {
      console.log('Login attempt with:', {
        email: formValues.email,
        password: formValues.password,
      });
    }
  };

  const handleForgotPasswordReset = () => {
    setForgotPassword(false);
    setResetSent(false);
    setFormValues(prev => ({
      ...prev,
      resetEmail: ''
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300">
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
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="resetEmail"
                    value={formValues.resetEmail}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
                >
                  Send Reset Instructions
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formValues.companyName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={'ke'}
                      value={formValues.phoneNumber}
                      onChange={(phone) =>
                        setFormValues((prev) => ({ ...prev, phoneNumber: phone }))
                      }
                      containerClass="w-full"
                      inputStyle={{
                        width: '100%',
                        height: '46px',
                        fontSize: '16px',
                        paddingLeft: '48px',
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

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formValues.fullName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                      placeholder="Your full name"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary pr-10"
                    placeholder="••••••••"
                    required
                  />
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
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formValues.confirmPassword}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Timezone
                    </label>
                    <TimezoneSelect 
                      value={formValues.timezone || 'Africa/Nairobi'} 
                      onChange={handleTimezoneChange} 
                      className="w-full rounded-lg"
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: '#D1D5DB',
                          padding: '4px',
                          backgroundColor: '#F9FAFB',
                          borderRadius: '0.5rem',
                        }),
                        menu: (base) => ({
                          ...base,
                          borderRadius: '0.5rem',
                          overflow: 'hidden',
                        }),
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Industry
                      </label>
                      <select
                        name="industry"
                        value={formValues.industry}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
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
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formValues.country}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                        placeholder="Country"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formValues.city}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                      placeholder="City"
                    />
                  </div>
                </>
              )}

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
              >
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