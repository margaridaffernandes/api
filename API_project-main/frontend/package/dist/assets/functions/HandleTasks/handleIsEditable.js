const handleIsEditable = (item, professionalTasks) => {
  let isEditable = false;

  if (item.TaskEditable.indexOf("All") > -1) {
    isEditable = true;
  } else {
    let i;

    for (i = 0; i < professionalTasks.length; i++) {
      const task = professionalTasks[i];

      if (item.TaskEditable.indexOf(task) > -1) {
        isEditable = true;
        break;
      }
    }
  }

  return isEditable;
};

export { handleIsEditable };