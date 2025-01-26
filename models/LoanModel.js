const mongoose = require("mongoose");

// Define the Loan Schema
const loanSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  loanType: {
    type: String,
    enum: ["Wedding Loan", "Home Loan", "Education Loan", "Business Loan"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Loan model
const LoanModel = mongoose.model("Loan", loanSchema);
module.exports = LoanModel;
