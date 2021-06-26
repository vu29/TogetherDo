const {Router} = require('express')

const router = Router();

router.use('/tasks',require('./api/task'));
router.use('/auth',require('./api/auth'));
module.exports = router;