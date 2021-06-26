const {Router} = require('express')

const router = Router();

router.use('/tasks',require('./api/task'));
router.use('/auth',require('./api/auth'));
router.use('/teams',require('./api/teams'));
module.exports = router;