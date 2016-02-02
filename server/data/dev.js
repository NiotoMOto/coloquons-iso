const User = require('mongoose').model('User');

function populate(next) {
  console.log('Poulate database ....');
  // Drop database
  return Promise.all([
    User.remove({})
  ]).then(() => {
      User.create({username : 'Antoine', password: 'antoine'});
      User.create({username : 'Sébastien', password: 'seb'});
  });
}


module.exports.populate = populate;
