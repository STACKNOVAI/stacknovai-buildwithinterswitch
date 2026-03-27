import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignup = (endpoint) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [uiState, setUiState] = useState({
    showPassword: false,
    agreed: false,
    isLoading: false,
    showSuccess: false,
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (!value) return false;
    const rules = {
      firstName: value.length >= 2,
      lastName: value.length >= 2,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      phone: value.length >= 10,
      password: value.length >= 8,
    };
    return rules[name] ?? true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!validateField(key, formData[key])) {
        newErrors[key] = `Invalid ${key}`;
      }
    });

    if (!uiState.agreed) newErrors.agreed = "You must agree to terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setUiState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone, // Matching your backend field name
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // 1. Show Success Animation
      setUiState((prev) => ({ ...prev, showSuccess: true }));

      // 2. Redirect to Dashboard after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setUiState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return {
    formData,
    uiState,
    errors,
    handleChange,
    handleSubmit,
    validateField,
    setAgreed: (val) => setUiState((prev) => ({ ...prev, agreed: val })),
    toggleUi: (key) => setUiState((prev) => ({ ...prev, [key]: !prev[key] })),
  };
};
