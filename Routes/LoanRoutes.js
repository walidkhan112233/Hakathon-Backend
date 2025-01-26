const express = require("express");
const LoanModel = require("../models/LoanModel");
const AuthController = require("./././../Controller/AuthController");

const Route = express.Router();

// Request a loan
Route.post("/request", AuthController.Protected, async (req, res) => {
  try {
    const body = req.body;
    const newLoan = new LoanModel({
      userId: body.userId,
      loanType: body.loanType,
      amount: body.amount,
    });
    const result = await newLoan.save();
    res.status(201).json({
      isSuccessful: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      isSuccessful: false,
      error: error.message,
    });
  }
});

// Get loans for a user
Route.get("/:userId", AuthController.Protected, async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await LoanModel.find({ userId });
    res.status(200).json({
      isSuccessful: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      isSuccessful: false,
      error: error.message,
    });
  }
});

// Admin: Approve/Reject loan
Route.put("/update/:loanId", AuthController.Protected, async (req, res) => {
  try {
    const loanId = req.params.loanId;
    const { status } = req.body;
    const updatedLoan = await LoanModel.findByIdAndUpdate(
      loanId,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json({
      isSuccessful: true,
      data: updatedLoan,
    });
  } catch (error) {
    res.status(400).json({
      isSuccessful: false,
      error: error.message,
    });
  }
});

module.exports = Route;
