LoanScope

Explore your loan's payoff behavior. You will be able to enter a starting principal, annual interest rate, and monthly payment to see the loan's payoff schedule and total interest.

Requirements
  Node.js
  npm

Installation
Clone the repository:
  git clone https://github.com/timpepjam2005-dot/loanscope/new/main?filename=README.md
Enter the project folder:
  cd loanscope
Install the required dependencies:
  npm install

Running the Application
LoanScope uses a React frontend and an Express backend.
  1. Start the project folder, run:
      node server/server.js
     The backend should start on:
       http://localhost:3000
  2. Start the frontend
     Open a second terminal in the project folder and run:
       npm run dev
     Vite will provide a local URL, usually:
       http://localhost:5173
     Open that URL in your web browser.

Features
  Loan principal input
  Annual interest rate input
  Monthly payment input
  Loan amortization schedule
  Total interest calculation
  Loan balance chart
  Backend validation
