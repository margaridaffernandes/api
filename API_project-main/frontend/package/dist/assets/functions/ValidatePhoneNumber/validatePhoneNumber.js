const validatePhoneNumber = value => {
  if (value.length === 9 && !isNaN(value)) {
    return true;
  }

  return false;
};

export { validatePhoneNumber };