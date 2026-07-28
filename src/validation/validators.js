/* Validation rules for BookStore forms */

export const validateUsername = (username) => {
  if (!username || username.trim() === '') {
    return 'Username is required.';
  }
  if (!/^[A-Z]/.test(username)) {
    return 'Username must begin with a capital letter.';
  }
  if (!/^[A-Za-z\s]+$/.test(username)) {
    return 'Username must contain only alphabets and spaces.';
  }
  if (username.trim().length < 3) {
    return 'Username must be at least 3 characters long.';
  }
  return '';
};

export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return 'Email is required.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address.';
  }
  return '';
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required.';
  }
  if (!/^\d{10}$/.test(phone)) {
    return 'Phone number must be exactly 10 digits.';
  }
  return '';
};

export const validateAge = (age) => {
  if (!age || age.toString().trim() === '') {
    return 'Age is required.';
  }
  const numAge = Number(age);
  if (isNaN(numAge) || !Number.isInteger(numAge)) {
    return 'Age must be a valid number.';
  }
  if (numAge < 18) {
    return 'You must be at least 18 years old.';
  }
  if (numAge > 100) {
    return 'Age must be 100 or less.';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password || password === '') {
    return 'Password is required.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least 1 uppercase letter.';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least 1 lowercase letter.';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least 1 number.';
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return 'Password must contain at least 1 special character.';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword === '') {
    return 'Please confirm your password.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return '';
};

export const getPasswordChecks = (password) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  };
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  errors.email = validateEmail(email);
  errors.password = password ? '' : 'Password is required.';
  return errors;
};

export const validateSignupForm = (formData) => {
  const errors = {};
  errors.username = validateUsername(formData.username);
  errors.email = validateEmail(formData.email);
  errors.phone = validatePhone(formData.phone);
  errors.age = validateAge(formData.age);
  errors.password = validatePassword(formData.password);
  errors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
  return errors;
};
