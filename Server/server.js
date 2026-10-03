import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({
        message: "LoanScope backend is working!"
    });
});

app.post("/api/calculate", (req, res) => {
    const { principal, interestRate, payment } = req.body;

    if(
        typeof principal !== "number" ||
        typeof interestRate !== "number" ||
        typeof payment !== "number"
    ) {
        return res.status(400).json({
            error: "Loan values must be numbers."
        });
    }

    if( principal < 1 || principal > 100000000) {
        return res.status(400).json({
            error: "Principal must be beteween $1 and $100,000,000."
        });
    }

    if(interestRate < 0 || interestRate > 40) {
        return res.status(400).json({
            error: "Interest rate must be between 0% and 40%."
        });
    }

    if(payment < 1 || payment > 1000000) {
        return res.status (400).json({
            error: "Monthly payment must be between $1 and $1,000,000."
        });
    }

    const monthlyRate = interestRate / 100 / 12;

    const monthlyInterest = principal * monthlyRate;

    if(payment <= monthlyInterest) {
        return res.status(400).json({
            error: "Monthly payment must be greater than the monthly interest."
        });
    }

    let balance = principal;
    let totalInterest = 0;
    const schedule = [];

    for(let month = 1; month <= 1200; month++) {
        if(balance <= 0) {
            break;
        }

        const interest = balance * monthlyRate;
        const principalPaid = payment - interest;

        balance = balance - principalPaid;

        if(balance < 0) {
            balance = 0;
        }

        totalInterest += interest;

        schedule.push({
            month: month,
            payment: payment,
            interest: interest,
            principal: principalPaid,
            balance: balance
        });
    }

    res.json({
        schedule: schedule,
        totalInterest: totalInterest
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});