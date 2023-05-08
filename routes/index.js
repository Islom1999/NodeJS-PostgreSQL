
const { Router } = require('express') 

const router = Router()

router.use('/jobs', require('./jobs'))
router.use('/employer', require('./employer'))

module.exports = router

