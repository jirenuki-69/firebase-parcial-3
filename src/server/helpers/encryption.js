const bcrypt = require('bcrypt');

const encryption = {
  encryptPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);

    return hash;
  },
  matchPassword: async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword, (err, result) => {});
  }
};

module.exports = encryption;
