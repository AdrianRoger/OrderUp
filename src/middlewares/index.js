const corsMiddleware = require('./corsMiddleware');
const upload = require('./MulterMiddleware');

module.exports = {
  corsMiddleware,
  upload,
}
