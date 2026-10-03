export function calculateSchedule(
    principal,
    annualInterestRate,
    monthlyPayment
) {

    const monthlyRate = annualInterestRate / 100 / 12;

    let balance = principal;

    let totalInterest = 0;

    const schedule = [];

    for(let month = 1; month <= 1200; month++) {

        if(balance <= 0) {
            break;
        }

        const interest = balance * monthlyRate;

        const principalPaid = monthlyPayment - interest;

        balance = balance - principalPaid;

        if(balance < 0) {
            balance = 0;
        }

        totalInterest += interest;

        schedule.push({
            month: month,
            payment: monthlyPayment,
            interest: interest,
            principal: principalPaid,
            balance: balance
        });
    }

    return {
        schedule,
        totalInterest
    };
}