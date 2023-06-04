const handleIsVisible = (item, professionalTasks) => {
  let isVisible = false;

  if (item.TaskVisible.indexOf("All") > -1) {
    isVisible = true;
  } else {
    let i;

    for (i = 0; i < professionalTasks.length; i++) {
      const task = professionalTasks[i];

      if (item.TaskVisible.indexOf(task) > -1) {
        isVisible = true;
        break;
      }
    }
  }

  return isVisible;
};

export { handleIsVisible };