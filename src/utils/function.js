const departmentName = (number) => {
  if (number === 1) {
    return 'FD';
  }
  if (number === 2) {
    return 'GSC';
  }
  if (number === 3) {
    return 'F&B';
  }
  if (number === 4) {
    return 'valet';
  }
  return 'FS';
};

export { departmentName };
