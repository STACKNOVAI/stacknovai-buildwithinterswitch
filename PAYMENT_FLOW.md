# CareLink Payment Flow Documentation

## Overview
The payment system is seamlessly integrated throughout the CareLink app, with the primary flow triggered when users book consultations with doctors.

---

## Payment Flow Architecture

### 1. **Consultation Initiation** (FindDoctor Page)
- User browses available doctors on `/find-doctor`
- User clicks "Consult Now" button on a doctor's card
- The `onConsult` handler is triggered with doctor and AI result data

### 2. **Navigation to Payment** (App.jsx)
- `FindDoctorWithNav` wrapper captures the consultation details
- Extracts the doctor's price and converts to numeric value
- Navigates to `/payment` route with state containing:
  ```javascript
  {
    pendingConsultation: {
      doctor: { name, specialty, img, price, ... },
      aiResult: { symptoms, urgency_level, ... },
      amount: 70000, // Parsed from ₦70,000
      type: "consultation"
    }
  }
  ```

### 3. **Payment Page** (payment.jsx)
- Receives `pendingConsultation` data via route state
- Pre-fills the payment form with:
  - **Amount**: Doctor's consultation fee (NGN)
  - **Type**: "consultation"
  - **Doctor Info**: Displays as summary card
- User reviews and initiates payment

### 4. **Payment Processing**
- Calls backend `/payments/initiate` endpoint
- Sends to Interswitch payment gateway
- Payment reference is stored for verification

### 5. **Payment Verification**
- After returning from payment gateway, verification is triggered
- Calls backend `/payments/verify/{reference}` endpoint
- If successful:
  - Shows success message
  - Auto-redirects to `/conversations` (to start consultation)
  - Passes consultation ID in navigation state

### 6. **Post-Payment** (Conversations Page)
- User is redirected to conversations/consultation interface
- Consultation with the selected doctor begins

---

## File Structure

```
src/
├── App.jsx                          # Main routing with payment integration
│   ├── FindDoctorWithNav()         # Wrapper for doctor selection
│   └── PaymentWithNav()            # Wrapper for payment processing
├── pages/
│   ├── payment.jsx                 # Payment form & verification
│   ├── payment.css                 # Payment styling
│   ├── FindDoctor.jsx              # Doctor browsing
│   └── Conversations.jsx           # Post-payment consultation
└── utils/
    └── paymentService.js           # API calls for payment operations
```

---

## Component Props & Data Flow

### FindDoctorWithNav Props
```javascript
{
  aiResult: {
    symptoms: ["fever", "cough"],
    urgency_level: "medium",
    recommended_specialty: "General Medicine",
    summary: "..."
  }
}
```

### PaymentWithNav Props
Receives from navigation state:
```javascript
{
  pendingConsultation: {
    doctor: doctorObject,
    aiResult: aiResultObject,
    amount: 70000,
    type: "consultation"
  }
}
```

### Payment Component Props
```javascript
{
  pendingConsultation: {
    doctor: { name, specialty, img, price, id, ... },
    aiResult: { ... },
    amount: number,
    type: string
  }
}
```

---

## API Integration

### Backend Endpoints

#### 1. Initiate Payment
```
POST /api/payments/initiate
Headers: Authorization: Bearer {token}
Body: {
  amount: 70000,
  type: "consultation",
  consultationId: optional
}
Response: {
  reference: "CARELINK-1234567890-userId",
  amount: 70000,
  paymentId: "...",
  interswitchData: { paymentUrl: "..." }
}
```

#### 2. Verify Payment
```
GET /api/payments/verify/{reference}
Headers: Authorization: Bearer {token}
Response: {
  status: "success" | "failed",
  amount: 70000,
  reference: "...",
  interswitchData: { ... }
}
```

---

## Payment Service (paymentService.js)

### Available Functions

#### `initiatePayment(amount, type, consultationId)`
Initiates a payment transaction
```javascript
const response = await initiatePayment(70000, "consultation", doctorId);
// Returns: { message, data: { reference, interswitchData } }
```

#### `verifyPayment(reference)`
Verifies payment completion
```javascript
const response = await verifyPayment("CARELINK-1234567890-userId");
// Returns: { message, data: { status, interswitchData } }
```

#### `getPaymentHistory()`
Fetches user's payment history
```javascript
const history = await getPaymentHistory();
// Returns: Array of payment records
```

---

## User Experience Flow

```
1. User at Dashboard/Home
   ↓
2. Uses AI Nurse or Clicks "Find Doctor"
   ↓
3. Browses Doctors at /find-doctor
   ↓
4. Clicks "Consult Now" on doctor
   ↓
5. Redirected to /payment with doctor info
   ↓
6. Reviews consultation summary
   ↓
7. Payment form pre-filled with fee (₦)
   ↓
8. Confirms & clicks "Proceed to Payment"
   ↓
9. Redirected to Interswitch gateway
   ↓
10. Completes payment online
   ↓
11. Returns to /payment with reference
   ↓
12. Auto-verifies payment
   ↓
13. If successful → Auto-redirect to /conversations
   ↓
14. Consultation begins with doctor
```

---

## Currency & Pricing

- **Currency**: Nigerian Naira (₦)
- **Format**: Stored as numeric values in kobo (multiply by 100)
- **Display**: Shows as "₦70,000 / consult"
- **Input**: Automatically parsed from doctor price strings

Example:
```javascript
doctor.price = "₦70,000"
amount = parseFloat(doctor.price.replace(/[^\d]/g, "")) // = 70000
amountInKobo = amount * 100 // = 7000000 (for backend)
```

---

## Error Handling

### Payment Initiation Errors
- Invalid amount (≤ 0)
- Missing payment type
- Interswitch service timeout
- Authentication failure
- Invalid payment details

### Verification Errors
- Payment reference not found
- Payment not found on gateway
- Service timeout
- Authentication failure

All errors are displayed to user with appropriate messaging and retry options.

---

## Security Features

1. **Authentication**: Requires bearer token from localStorage
2. **HTTPS**: All API calls use HTTPS
3. **Encryption**: Interswitch handles payment encryption
4. **Reference Tracking**: Unique reference per transaction
5. **Token Management**: Automatic logout on 401 errors

---

## Testing the Payment Flow

### 1. Local Testing
- Set `VITE_API_URL` in `.env` to your local backend
- Example: `VITE_API_URL=http://localhost:5000/api`

### 2. Mock Payment
- Use Interswitch test credentials in backend
- Test payment references: `CARELINK-{timestamp}-{userId}`

### 3. Verification
Check browser console for:
- Payment reference storage
- Auto-verification trigger
- Redirect to conversations page

---

## Future Enhancements

1. **Payment History**: View past consultations and payments
2. **Wallet Integration**: Credit/debit wallet balance
3. **Subscription Plans**: Monthly consultation packages
4. **Refunds**: Handle refund requests
5. **Invoice Generation**: PDF receipts for payments
6. **Multiple Payment Methods**: Card, mobile money, bank transfer

---

## Troubleshooting

### Payment Not Initiating
- Check authentication token in localStorage
- Verify API endpoint is correct
- Check console for validation errors

### Payment Verification Failing
- Ensure payment was completed on Interswitch
- Check reference is stored correctly
- Verify backend is running and accessible

### Not Redirecting to Conversations
- Check navigation state is passed correctly
- Verify consultation ID is in pending data
- Check for console errors

---

## Support & Questions

For issues or questions about the payment system, check:
- Backend payment controller logs
- Browser console for client-side errors
- Interswitch dashboard for transaction status
