import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const paymentClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Add auth token to requests
paymentClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
paymentClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Initiate a payment
 * @param {number} amount - Amount in NGN
 * @param {string} type - Payment type (consultation, medication, etc.)
 * @param {string} consultationId - Optional consultation ID
 * @returns {Promise<Object>} Payment response with reference
 */
export const initiatePayment = async (amount, type, consultationId = null) => {
  try {
    const response = await paymentClient.post('/payments/initiate', {
      amount,
      type,
      consultationId: consultationId || undefined,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to initiate payment'
    );
  }
};

/**
 * Verify a payment
 * @param {string} reference - Payment reference
 * @returns {Promise<Object>} Verification response with status
 */
export const verifyPayment = async (reference) => {
  try {
    const response = await paymentClient.get(`/payments/verify/${reference}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to verify payment'
    );
  }
};

/**
 * Get payment status
 * @param {string} reference - Payment reference
 * @returns {Promise<Object>} Payment details
 */
export const getPaymentStatus = async (reference) => {
  try {
    const response = await paymentClient.get(`/payments/${reference}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch payment status'
    );
  }
};

/**
 * Get user's payment history
 * @returns {Promise<Array>} Array of payment records
 */
export const getPaymentHistory = async () => {
  try {
    const response = await paymentClient.get('/payments/history');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch payment history'
    );
  }
};

export default paymentClient;
