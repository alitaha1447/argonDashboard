import { toast } from "react-toastify";
export const mandatoryFields = ({
  fullName,
  contactNumber,
  email,
  isCourseEnquiry,
  selectedQualification,
  selectedCoursesOptions,
}) => {
  console.log(isCourseEnquiry);

  // Full Name Validation

  const trimmedName = fullName.trim();
  if (!trimmedName) {
    toast.warn("Name is a mandatory field!");
    return false;
  }
  if (trimmedName.length > 200) {
    toast.warn("Name cannot exceed 200 characters!");
    return false;
  }
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(trimmedName)) {
    toast.warn("Name should not contain special characters or numbers!");
    return false;
  }

  // Contact Number Validation
  if (!contactNumber.trim()) {
    toast.warn("Contact number is a mandatory field!");
    return false;
  }

  const isAllDigits = /^\d{10}$/.test(contactNumber);
  if (!isAllDigits || contactNumber.length !== 10) {
    toast.warn("Contact number must be exactly 10 numeric digits!");
    return false;
  }

  // Email Validation
  if (!email.trim()) {
    toast.warn("Email is a mandatory field!");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.warn("Please enter a valid email address!");
    return false;
  }

  if (isCourseEnquiry) {
    if (!selectedQualification) {
      toast.warn("Highest Qualification is required for Course Enquiry!");
      return false;
    }
    if (!selectedCoursesOptions || selectedCoursesOptions.length === 0) {
      toast.warn("Course is required for Course Enquiry!");
      return false;
    }
  }

  return true;
};
