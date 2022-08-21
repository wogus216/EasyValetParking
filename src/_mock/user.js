import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { fNowTime } from 'src/utils/formatTime';

// ----------------------------------------------------------------------
faker.locale = 'ko';

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  // avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.lastName() + faker.name.firstName(),
  ticketNumber: faker.datatype.number(),
  carNumber: faker.datatype.number({ min: 1000, max: 9999 }),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  enterTime: fNowTime(new Date()),
  outTime: fNowTime(new Date()),
  status: sample(['active', 'banned']),
  parkinglot: sample(['M', 'M2', 'B201', 'B101', 'B310', 'IP', 'K', 'H']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
