const express = require('express')
const router = express.Router()
const plaidController = require('../controllers/plaidController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create-link-token', authMiddleware, plaidController.createLinkToken);

router.post('/exchange-token',authMiddleware,plaidController.exchangePublicToken)
router.post('/transactions',authMiddleware, plaidController.getTransactions)


module.exports = router