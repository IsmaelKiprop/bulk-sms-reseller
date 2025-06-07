/**
 * Utility for generating structured user metadata
 */

/**
 * Generate a UUID for API keys
 * @returns {string} A UUID string
 */
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Generate API credentials
 * @returns {Object} API key and secret
 */
const generateApiCredentials = () => {
  return {
    key: `api_${Math.random().toString(36).substring(2, 10)}`,
    secret: `secret_${Math.random().toString(36).substring(2, 10)}`
  };
};

/**
 * Generate full user metadata object
 * @param {Object} userData - User input data
 * @returns {Object} Structured metadata
 */
export const generateUserMetadata = (userData) => {
  const { timezone, industry, city, country } = userData;
  const api = generateApiCredentials();
  
  // Calculate subscription dates
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3); // 3-day demo
  
  return {
    subscription: {
      plan: 'demo',
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      auto_renew: false,
      features: ['template-library', '5-free-sms'],
      price: 0,
      currency: 'KES'
    },
    preferences: {
      timezone: timezone || 'Africa/Nairobi',
      default_sender_id: 'INFO',
      notifications: {
        low_balance: 1000,
        delivery_reports: true
      }
    },
    business: {
      industry: industry || 'Other',
      size: 'Not specified',
      address: {
        city: city || '',
        country: country || 'Kenya'
      }
    },
    api: {
      key: api.key,
      secret: api.secret,
      allowed_ips: []
    }
  };
};

/**
 * Update user metadata
 * @param {Object} existingMetadata - Current metadata
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated metadata
 */
export const updateUserMetadata = (existingMetadata, updates) => {
  // Deep merge the existing metadata with updates
  return {
    ...existingMetadata,
    ...updates,
    subscription: {
      ...(existingMetadata?.subscription || {}),
      ...(updates?.subscription || {})
    },
    preferences: {
      ...(existingMetadata?.preferences || {}),
      ...(updates?.preferences || {}),
      notifications: {
        ...(existingMetadata?.preferences?.notifications || {}),
        ...(updates?.preferences?.notifications || {})
      }
    },
    business: {
      ...(existingMetadata?.business || {}),
      ...(updates?.business || {}),
      address: {
        ...(existingMetadata?.business?.address || {}),
        ...(updates?.business?.address || {})
      }
    },
    api: {
      ...(existingMetadata?.api || {}),
      ...(updates?.api || {})
    }
  };
};

export default {
  generateUserMetadata,
  updateUserMetadata,
  generateApiCredentials
}; 