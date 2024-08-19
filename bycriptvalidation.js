const bcrypt = require('bcrypt');

const storedPasswordHash = '$2b$10$M2qhzzbiKaWdRv1L.FUzX.VzqpU2nBX46n3jHak29AY22qRiy9jwq';
const passwordAttempt = 'joao1234';

bcrypt.compare(passwordAttempt, storedPasswordHash, (err, result) => {
  if (result) {
    console.log('Password is valid');
  } else {
    console.log('Invalid password');
  }
});

