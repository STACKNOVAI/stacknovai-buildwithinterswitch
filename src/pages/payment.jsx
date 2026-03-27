import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../pages/payment.css';

const Payment = ({ pendingConsultation }) => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    amount: pendingConsultation?.amount || '',
    type: pendingConsultation?.type || 'consultation',
    consultationId: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  // Validate payment data
  const validatePaymentData = () => {
    if (!paymentData.amount || paymentData.amount <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    if (!paymentData.type) {
      setError('Please select a payment type');
      return false;
    }
    return true;
  };

  // Initiate payment
  const handleInitiatePayment = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePaymentData()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments/initiate`,
        {
          amount: parseFloat(paymentData.amount),
          type: paymentData.type,
          consultationId: paymentData.consultationId || undefined
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );

      const { reference, interswitchData } = response.data.data;
      setPaymentReference(reference);
      setSuccess('Payment initiated successfully. Redirecting to payment gateway...');

      // Redirect to Interswitch payment URL if available
      if (interswitchData.paymentUrl) {
        setTimeout(() => {
          window.location.href = interswitchData.paymentUrl;
        }, 1500);
      } else {
        // If no direct URL, you might need to handle this differently
        // Store the reference for later verification
        localStorage.setItem('pendingPaymentReference', reference);
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to initiate payment';
      setError(errorMessage);
      console.error('Payment initiation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Verify payment
  const handleVerifyPayment = async () => {
    if (!paymentReference) {
      setError('No payment reference found');
      return;
    }

    setVerifying(true);
    setError('');
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payments/verify/${paymentReference}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );

      const { status, interswitchData } = response.data.data;
      setPaymentStatus(status);

      if (status === 'success') {
        setSuccess('✓ Payment verified successfully!');
        // Redirect to conversation/consultation after successful payment
        setTimeout(() => {
          if (pendingConsultation?.doctor?.id) {
            navigate('/conversations', { state: { consultationId: pendingConsultation.doctor.id } });
          } else {
            navigate('/dashboard');
          }
        }, 2000);
      } else {
        setError('Payment verification failed. Please try again.');
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to verify payment';
      setError(errorMessage);
      console.error('Payment verification error:', err);
    } finally {
      setVerifying(false);
    }
  };

  // Check for pending payment on page load
  useEffect(() => {
    const pendingReference = localStorage.getItem('pendingPaymentReference');
    if (pendingReference) {
      setPaymentReference(pendingReference);
      // Auto-verify after returning from payment gateway
      setTimeout(() => {
        handleVerifyPayment();
      }, 2000);
    }

    // Pre-fill form if coming from consultation
    if (pendingConsultation) {
      setPaymentData(prev => ({
        ...prev,
        amount: pendingConsultation.amount,
        type: pendingConsultation.type
      }));
    }
  }, [pendingConsultation]);

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1>Make a Payment</h1>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">✕</span>
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span>
            {success}
          </div>
        )}

        {/* Payment Status */}
        {paymentStatus && (
          <div className={`alert alert-${paymentStatus}`}>
            <span className="alert-icon">
              {paymentStatus === 'success' ? '✓' : '✕'}
            </span>
            Payment Status: {paymentStatus.toUpperCase()}
          </div>
        )}

        {!paymentReference ? (
          // Payment Form
          <>
            {/* Consultation Summary (if from doctor consultation) */}
            {pendingConsultation?.doctor && (
              <div className="consultation-summary">
                <div className="consultation-header">
                  <img 
                    src={pendingConsultation.doctor.img} 
                    alt={pendingConsultation.doctor.name}
                    className="doctor-avatar"
                  />
                  <div className="doctor-details">
                    <h3>{pendingConsultation.doctor.name}</h3>
                    <p>{pendingConsultation.doctor.specialty}</p>
                  </div>
                </div>
                <div className="consultation-divider"></div>
              </div>
            )}

            <form onSubmit={handleInitiatePayment} className="payment-form">
            <div className="form-group">
              <label htmlFor="amount">Amount (NGN)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={paymentData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                min="0"
                step="0.01"
                disabled={loading}
                required
              />
              <small>Minimum amount: ₦1.00</small>
            </div>

            <div className="form-group">
              <label htmlFor="type">Payment Type</label>
              <select
                id="type"
                name="type"
                value={paymentData.type}
                onChange={handleInputChange}
                disabled={loading}
                required
              >
                <option value="consultation">Consultation</option>
                <option value="medication">Medication</option>
                <option value="booking">Booking</option>
                <option value="subscription">Subscription</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="consultationId">Consultation ID (Optional)</label>
              <input
                type="text"
                id="consultationId"
                name="consultationId"
                value={paymentData.consultationId}
                onChange={handleInputChange}
                placeholder="Enter consultation ID if applicable"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
            </form>
          </>
        ) : (
          // Payment Verification
          <div className="payment-verification">
            <div className="verification-content">
              <h2>Payment Reference</h2>
              <p className="reference-text">{paymentReference}</p>
              <p className="reference-hint">
                Copy this reference for your records
              </p>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(paymentReference);
                setSuccess('Reference copied to clipboard');
              }}
              className="btn btn-secondary"
            >
              Copy Reference
            </button>

            <button
              onClick={handleVerifyPayment}
              className="btn btn-primary"
              disabled={verifying}
            >
              {verifying ? 'Verifying...' : 'Verify Payment'}
            </button>

            <button
              onClick={() => {
                setPaymentReference('');
                setPaymentStatus('');
                setSuccess('');
                setError('');
                localStorage.removeItem('pendingPaymentReference');
              }}
              className="btn btn-secondary"
            >
              Make Another Payment
            </button>
          </div>
        )}

        {/* Payment Info */}
        <div className="payment-info">
          <h3>Payment Information</h3>
          <ul>
            <li>Secure payment processing via Interswitch</li>
            <li>All transactions are encrypted and secure</li>
            <li>You will receive a confirmation email</li>
            <li>Processing time: 1-5 minutes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payment;
