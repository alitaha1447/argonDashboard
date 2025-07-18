export const getValidationErrors = ({
  fullName,
  contactNumber,
  email,
  isCourseEnquiry,
  selectedQualification,
  selectedCoursesOptions,
  gender,
}) => {
  const errors = {};

  const trimmedName = fullName.trim();
  if (!trimmedName) {
    errors.fullName = "Name is a mandatory field!";
  } else if (trimmedName.length > 200) {
    errors.fullName = "Name cannot exceed 200 characters!";
  } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
    errors.fullName = "Name should not contain special characters or numbers!";
  }

  if (!contactNumber.trim()) {
    errors.contactNumber = "Contact number is a mandatory field!";
  } else if (!/^\d{10}$/.test(contactNumber)) {
    errors.contactNumber = "Contact number must be exactly 10 digits!";
  }

  if (!email.trim()) {
    errors.email = "Email is a mandatory field!";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address!";
  }

  if (!gender) {
    errors.gender = "Gender is a mandatory field!";
  }

  if (isCourseEnquiry) {
    if (!selectedQualification) {
      errors.selectedQualification = "Highest Qualification is required!";
    }
    if (!selectedCoursesOptions || selectedCoursesOptions.length === 0) {
      errors.selectedCoursesOptions = "At least one course must be selected!";
    }
  }

  return errors;
};
