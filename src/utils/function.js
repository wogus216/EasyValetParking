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

const parkingAreaConvert = (number) => {
  if (number === '1') {
    return 'M';
  }
  if (number === '2') {
    return 'M2';
  }
  if (number === '3') {
    return 'IP';
  }
  if (number === '4') {
    return 'H';
  }
  if (number === '5') {
    return 'K';
  }
  if (number[0] === 'B' || number[0] === 'b') {
    console.log('number[1]', typeof Number(number[1]));
    console.log('number[2]', number[2]);

    if (Number(number[1]) > 3 || Number(number[2]) > 3 || Number(number[1]) <= 0) {
      return false;
    }
    return number;
  }
};

export { departmentName, parkingAreaConvert };
