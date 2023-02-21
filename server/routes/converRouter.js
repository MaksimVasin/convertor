const Router = require('express')
const router = new Router()

const multer = require('multer')
const convertController = require('../controllers/convertController')
const upload = multer({ dest: 'uploads/' })

router.post('/testConvert', convertController.testConvert)
router.post('/testUpload', upload.single('file'), convertController.testUpload);
module.exports = router