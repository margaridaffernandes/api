const handleInReport = (item, professionalTasks) => {
  let inReport = false;

  if (item.TaskInReport.indexOf("All") > -1) {
    inReport = true;
  } else {
    let i;

    for (i = 0; i < professionalTasks.length; i++) {
      const task = professionalTasks[i];

      if (item.TaskInReport.indexOf(task) > -1) {
        inReport = true;
        break;
      }
    }
  }

  return inReport;
};

export { handleInReport };