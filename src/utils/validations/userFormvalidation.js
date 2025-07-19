export const getValidationErrors = ({
  fullName,
  email,
  pass,
  confirmPass,
  gender,
}) => {
  const errors = {};

  const trimmedName = fullName.trim();
  if (!trimmedName) {
    errors.fullName = "Name is a mandatory field!";
  } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
    errors.fullName = "Name should not contain special characters or numbers!";
  }

  if (!email.trim()) {
    errors.email = "Email is a mandatory field!";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address!";
  }

  if (!pass.trim()) {
    errors.pass = "Password is required";
  } else if (pass.length < 4) {
    errors.pass = "Password must be at least 6 characters";
  }

  if (!confirmPass.trim()) {
    errors.confirmPass = "Confirm Password is required";
  } else if (pass !== confirmPass) {
    errors.confirmPass = "Passwords do not match";
  }

  if (!gender) {
    errors.gender = "Gender is a mandatory field!";
  }

  return errors;
};
