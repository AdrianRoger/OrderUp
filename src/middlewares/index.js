const corsMiddleware = require('./corsMiddleware');
const upload = require('./MulterMiddleware');
const authMiddleware = require('./AuthMiddleware')

module.exports = {
  corsMiddleware,
  authMiddleware,
  upload,
}
