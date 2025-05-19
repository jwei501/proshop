import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Adam Wei',
    email: 'adam@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
   {
    name: 'Gloria Shi',
    email: 'gloria@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  }
];

export default users;