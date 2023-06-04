const isDefined = value => {
  let isDefined = false;

  if (value !== undefined) {
    if (Array.isArray(value)) {
      let textIds = value.filter(obj => obj.textId !== undefined);
      let identifierIds = value.filter(obj => obj.identifierId !== undefined);

      if (textIds.length > 0) {
        let writtenFields = value.filter(obj => obj.value.getCurrentContent().hasText());

        if (writtenFields.length > 0) {
          isDefined = true;
        }
      } else if (identifierIds.length > 0) {
        let writtenIdentifiers = value.filter(obj => obj.value !== "");

        if (writtenIdentifiers.length > 0) {
          isDefined = true;
        }
      } else if (value.length > 0) {
        isDefined = true;
      }
    } else if (value._immutable !== undefined) {
      if (value.getCurrentContent().hasText()) {
        isDefined = true;
      }
    } else {
      isDefined = true;
    }
  }

  return isDefined;
};

export { isDefined };