# CareLink - AI-Powered Telemedicine Platform
**Build With Interswitch 2026 Hackathon Project**

---

## 📋 Project Overview
CareLink connects patients with doctors through AI-assisted consultations and secure Interswitch payments. Users get AI triage first, then consult with doctors via real-time chat, all with Nigerian Naira payment processing.

---

## 🎯 Key Features
✅ **AI Nurse Triage** - Groq-powered symptom analysis  
✅ **Doctor Consultations** - Real-time chat with doctors  
✅ **Interswitch Payments** - Secure NGN payment processing  
✅ **Appointment Management** - Book and track appointments  
✅ **Prescriptions** - Doctors create, patients view medications  
✅ **Real-time Chat** - Socket.IO powered messaging  
✅ **Authentication** - JWT-based patient & doctor login  

---

## 🛠️ Tech Stack

**Frontend**: React 18 + Vite | React Router v6 | Axios | CSS3  
**Backend**: Node.js | Express.js v5.2 | MongoDB + Mongoose | Socket.IO v4.8  
**Payment**: Interswitch | Kobo currency handling  
**AI**: Groq SDK v1.1 | Symptom analysis  
**Auth**: JWT + bcryptjs | Twilio SMS for OTP  

---

## 📁 Full Stack Structure

**Frontend** (`src/`):
- `pages/` - 12 React components (Landing, Login, FindDoctor, Payment, Conversations, etc.)
- `utils/` - groqClient.js, paymentService.js
- `App.jsx` - Routing with protected routes

**Backend** (`controller/`, `models/`, `routes/`):
- AI triage analysis
- Patient/Doctor authentication
- Consultation & message management
- Interswitch payment processing
- Prescription management

---

## 🚀 Installation & Setup

### Frontend
```bash
cd carelink-frontend
npm install
# Create .env: VITE_API_URL=http://localhost:7050
npm run dev
```

### Backend
```bash
cd carelink-backend
npm install
# Create .env with variables below
npm run dev
```

---

## ⚙️ Environment Variables

**Backend (.env)**:
```
PORT=7050
MONGOURI=mongodb+srv://user:pass@cluster.mongodb.net/carelink
JWT_SECRET=your_jwt_secret
INTERSWITCH_CLIENT_ID=your_client_id
INTERSWITCH_SECRET_KEY=your_secret_key
GROQ_API_KEY=your_groq_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
FRONTEND_URL=https://carelink-ruddy.vercel.app
```

**Frontend (.env)**:
```
VITE_API_URL=http://localhost:7050
VITE_GROQ_API_KEY=your_groq_key
```

---

## 🔌 Key API Endpoints

**Authentication**
```
POST /patient/signup        - Register patient
POST /patient/login         - Patient login
POST /doctor/register       - Doctor request OTP
POST /doctor/verify         - Doctor verify OTP
```

**Doctors**
```
GET  /doctor                - List all doctors
GET  /doctor/:id            - Get doctor details
```

**AI & Consultations**
```
POST /ai/analyze            - Analyze symptoms
POST /consultation/start    - Start consultation with doctor
GET  /consultation/:id      - Get consultation details
```

**Payments**
```
POST /payment/initiate      - Start Interswitch payment
GET  /payment/verify/:ref   - Verify payment status
```

**Messaging**
```
POST /message               - Send message
GET  /message/:consultationId - Get chat history
```

---

## 💳 Payment Flow

```
Patient → FindDoctor → "Consult Now"
    ↓
Payment Page (pre-filled with ₦ amount)
    ↓
POST /payment/initiate → Interswitch redirect
    ↓
User completes payment → Automatic verification
    ↓
Success → Start consultation with doctor
```

---

## 🔐 Security & Authentication

- JWT tokens stored in localStorage (frontend) and validated in headers (backend)
- Protected routes redirect unauthenticated users to login
- Passwords hashed with bcryptjs
- All API calls require Bearer token
- Interswitch payments verified before consultation activation

---

## 📱 User Flows

1. **Sign Up** → Email/password for patients, OTP for doctors
2. **AI Assessment** → Describe symptoms, get AI analysis
3. **Find Doctor** → Browse specialties, check availability
4. **Pay** → Interswitch processes ₦ payment
5. **Consult** → Real-time chat + optional video (Socket.IO)
6. **Prescription** → Doctor creates, patient downloads
7. **Manage** → Track bookings, prescriptions, history

---

## 🎨 Database Schema

**Patient**: fullName, email, phoneNumber, password, profile, emergencyContacts  
**Doctor**: fullName, specialty, rating, price, availability, bio  
**Consultation**: patientId, doctorId, status, aiNurseSummary, chatHistory  
**Message**: consultationId, senderId, role, message, timestamp  
**Payment**: patientId, consultationId, amount (kobo), reference, status  
**Prescription**: consultationId, medications, dosage, instructions  

---

## ✅ Deployment

**Frontend**: Deployed on [Vercel](https://carelink-ai-omega.vercel.app/)  
**Backend**: Deployed on Render (https://carelink-5qts.onrender.com)

---

## 📞 Live Demo
🔗 **Frontend**: https://carelink-ruddy.vercel.app/  
📂 **Repo**: [STACKNOVAI/stacknovai-buildwithinterswitch](https://github.com/STACKNOVAI/stacknovai-buildwithinterswitch)

🔗 **Backend**: https://carelink-5qts.onrender.com  
📂 **Repo**: [STACKNOVAI/stacknovai-buildwithinterswitch](https://github.com/STACKNOVAI/stacknovai-buildwithinterswitch-backend.git)

---

## 📝 Documentation
- **PAYMENT_DOCUMENTATION_INDEX.md** - Payment system details
- **NAVIGATION_AUDIT.md** - Complete routing verification
- **BUTTON_NAVIGATION_MAP.md** - Visual button reference

---

**Last Updated**: March 27, 2026 | Hackathon: Build With Interswitch 2026
