const express = require('express');
const Repayment = require('../models/Repayment');
const Loan = require('../models/Loan');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Add repayment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { loan_id, amount, paid_on } = req.body;
    if (!loan_id || !amount || !paid_on)
      return res.status(400).json({ message: 'All fields required' });

    const loan = await Loan.findById(loan_id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    if (loan.user_id !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not allowed' });

    const repayment = await Repayment.create({ loan_id, amount, paid_on });
    return res.status(201).json(repayment);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get repayments by loan
router.get('/loan/:loan_id', authMiddleware, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.loan_id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    if (loan.user_id !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not allowed' });

    const reps = await Repayment.findByLoan(req.params.loan_id);
    return res.json(reps);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
