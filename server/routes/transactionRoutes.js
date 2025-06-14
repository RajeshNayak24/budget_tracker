const express = require("express")
const router = express.Router()
const {
  addTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction
  
} = require("../controllers/transactionController");
const authMiddleware = require('../middleware/authMiddleware')

router.post('/addtransaction', authMiddleware, addTransaction)
router.get('/gettransaction',authMiddleware,getTransaction)
router.delete("/deletetransaction/:id", authMiddleware, deleteTransaction);
router.put("/updatetransaction/:id", authMiddleware, updateTransaction);


module.exports = router;