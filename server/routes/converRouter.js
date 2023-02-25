const Router = require('express')
const router = new Router()

const multer = require('multer')
const convertController = require('../controllers/convertController')
const upload = multer({ dest: 'uploads/' })

router.post('/convert', convertController.testConvert)
router.post('/upload', upload.single('file'), convertController.testUpload);
module.exports = router