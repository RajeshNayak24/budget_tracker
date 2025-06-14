const Transaction = require("../models/transactionModel");

const addTransaction = async (req, res) => {
  try {
    console.log("Received transaction:", req.body);
    const { description, type, amount, category, note } = req.body;
    const userId = req.user.id;

    const newTransaction = new Transaction({
      userId,
      description,
      type,
      amount,
      category,
      note,
    });
    await newTransaction.save();
    res
      .status(201)
      .json({ message: "Transaction added", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    res.json({ transactions });
  } catch (error) {
    console.error("Error getting transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    console.log("id ",req.params.id)
    const deletedtransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedtransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json({
      message: "Transaction deleted successfully",
      deletedtransaction,
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, type, date } = req.body;
    const updatedtransaction = await Transaction.findByIdAndUpdate(
      { _id: id, userId: req.user.id },
      {
        description,
        amount,
        type,
        date,
      },
      { new: true }
    );
    if (!updatedtransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json({
      message: "Transaction updated successfully",
      updatedtransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
};
