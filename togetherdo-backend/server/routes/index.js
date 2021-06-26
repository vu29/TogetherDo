const {Router} = require('express')

const router = Router();

router.use('/api/tasks',require('./api/task'));

module.exports = router;