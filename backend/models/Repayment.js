const pool = require('../config/db');

const Repayment = {
  async create({ loan_id, amount, paid_on }) {
    const [result] = await pool.query(
      'INSERT INTO repayments (loan_id, amount, paid_on) VALUES (?, ?, ?)',
      [loan_id, amount, paid_on]
    );
    const [rows] = await pool.query('SELECT * FROM repayments WHERE id = ?', [result.insertId]);
    return rows[0];
  },

  async findByLoan(loan_id) {
    const [rows] = await pool.query('SELECT * FROM repayments WHERE loan_id = ?', [loan_id]);
    return rows;
  }
};

module.exports = Repayment;
