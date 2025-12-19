const express = require('express');
const Loan = require('../models/Loan');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// User: apply for loan
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { amount, term_months, interest_rate } = req.body;
    if (!amount || !term_months || !interest_rate)
      return res.status(400).json({ message: 'All fields required' });

    const loan = await Loan.create({
      user_id: req.user.id,
      amount,
      term_months,
      interest_rate
    });

    return res.status(201).json(loan);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// User: get own loans
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const loans = await Loan.findByUser(req.user.id);
    return res.json(loans);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Admin: all loans
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const loans = await Loan.findAll();
    return res.json(loans);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Admin: update status
router.patch('/:id/status', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected', 'closed'].includes(status))
      return res.status(400).json({ message: 'Invalid status' });

    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    const updated = await Loan.updateStatus(req.params.id, status);
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
