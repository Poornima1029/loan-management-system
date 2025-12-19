const pool = require('../config/db');

const Loan = {
  async create({ user_id, amount, term_months, interest_rate }) {
    const [result] = await pool.query(
      'INSERT INTO loans (user_id, amount, term_months, interest_rate) VALUES (?, ?, ?, ?)',
      [user_id, amount, term_months, interest_rate]
    );
    const [rows] = await pool.query('SELECT * FROM loans WHERE id = ?', [result.insertId]);
    return rows[0];
  },

  async findByUser(user_id) {
    const [rows] = await pool.query('SELECT * FROM loans WHERE user_id = ?', [user_id]);
    return rows;
  },

  async findAll() {
    const [rows] = await pool.query('SELECT * FROM loans');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM loans WHERE id = ?', [id]);
    return rows[0];
  },

  async updateStatus(id, status) {
    await pool.query('UPDATE loans SET status = ? WHERE id = ?', [status, id]);
    const [rows] = await pool.query('SELECT * FROM loans WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = Loan;
