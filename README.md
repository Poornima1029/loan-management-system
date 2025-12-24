Loan Management System – Frontend

A responsive web application for managing loan applications, approvals, and repayments. This frontend is built with React and connects to a Node.js backend API to provide a complete fullstack experience.

Features (Current Frontend)

- User authentication
  - Registration and login forms with basic validation.
  - JWT-based session handling via localStorage (token + user info).

- User dashboard
  - Summary cards showing total loans, pending applications, and approved loans for the logged-in user.
  - Contextual greeting and quick overview of loan status.

- Loan application
  - “Apply Loan” page with form fields for amount, term (months), and interest rate.
  - Submits data to the backend API to create a new loan request.

- My loans
  - Table listing all loans for the current user.
  - Status displayed with colored pills (Pending, Approved, Rejected, Closed).
  - Links to view/add repayments per loan.

- Admin loan management
  - Admin-only page listing all loans in the system.
  - Buttons to approve, reject, or close loans via API calls.

- Repayments
  - Page to record repayments for a specific loan.
  - Table showing all repayments (amount, date) for that loan.

- UI/UX & layout
  - Clean card-based layout with global styling via `styles.css`.
  - Responsive navbar with role badge and navigation links.
  - Consistent buttons, tables, and form styling for a neat, aesthetic interface.

Future Improvements (Backend Integration & Enhancements)

- Robust error messages
  - Display more descriptive validation and server errors instead of a generic “Server error”.
  - Show field-level errors for invalid inputs or missing data.

- Stronger backend integration
  - Add loading states and retry logic when calling the backend (register/login/loans).
  - Improve handling of network failures and timeouts when the API is not reachable.

- Security & auth
  - Add token refresh and automatic logout on token expiry.
  - Role-based route protection with more granular permissions for admin vs user.

- Loan calculations
  - Show EMI / interest calculations and total repayment schedule on the frontend.
  - Visualize repayment progress with simple charts or progress bars.

- Profile & settings
  - Add a user profile page to update name/email and change password.
  - Optional: support multiple contact methods or KYC-status flags from backend.

This README provides a quick overview for reviewers and can be extended with setup instructions, API endpoints, and deployment details as the project evolves.
