const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')

router.get('/', mainController.indeX)
router.get('/registrar', mainController.showRegistro)
router.post('/registrar', mainController.createPatient)
router.get('/consultar', mainController.showConsulta)
router.post('/consultar', mainController.findPatient)
router.get('/about', mainController.showAbout)

module.exports = router