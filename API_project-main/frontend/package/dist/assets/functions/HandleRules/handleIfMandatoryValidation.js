const handleIfMandatoryValidation = item => {
  let checkMandatory;

  if (Array.isArray(item.ruleMandatory)) {
    if (item.ruleMandatory.length !== 0) {
      checkMandatory = true;
    } else {
      checkMandatory = false;
    }
  } else {
    checkMandatory = false;
  }

  return checkMandatory;
};

export { handleIfMandatoryValidation };