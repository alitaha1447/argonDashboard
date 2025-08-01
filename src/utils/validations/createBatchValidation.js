export const getValidationErrors = ({
  batchName = "",
  selectedQualification,
  selectedCoursesOptions,
  selectedBatch,
  selectedBranch,
  durationCount,
  selectedDurations,
  feeStructures, // ✅ Make sure this is passed
  installmentsDetails,
  // description = "",
  duration,
  startDate,
  batchLevel,
  location,
}) => {
  const errors = {};
  const trimmedbatchTitle = batchName?.trim();
  if (!trimmedbatchTitle) {
    errors.batchName = "Batch Title is a mandatory field!";
  }

  if (!selectedQualification || selectedQualification.length === 0) {
    errors.selectedQualification = "Highest Qualification is required!";
  }

  if (!selectedCoursesOptions || selectedCoursesOptions.length === 0) {
    errors.selectedCoursesOptions = "At least one course must be selected!";
  }

  if (!selectedBatch || selectedBatch.length === 0) {
    errors.selectedBatch = "At least one batch must be selected!";
  }

  if (!selectedBranch || selectedBranch.length === 0) {
    errors.selectedBranch = "At least one branch must be selected!";
  }

  if (!durationCount || durationCount.length === 0) {
    errors.durationCount = "Duration Count is required!";
  }

  if (!selectedDurations || selectedDurations.length === 0) {
    errors.selectedDurations = "Duration Select is required!";
  }

  // ✅ Fee structure validation
  if (Array.isArray(feeStructures) && feeStructures.length > 0) {
    const allValid = feeStructures.every(
      (item) =>
        item.selectedFees &&
        item.feesAmount &&
        !isNaN(parseFloat(item.feesAmount))
    );

    if (!allValid) {
      errors.feeStructures = "Please complete all fee items with valid values";
    }
  }

  if (!installmentsDetails || installmentsDetails.length === 0) {
    errors.installmentsDetails = "Please create installment details.";
  }

  // if (!description.trim()) {
  //   errors.description = "Description is required.";
  // } else if (description.length > 1000) {
  //   errors.description = "Description must not exceed 1000 characters.";
  // }

  return { errors };
};
