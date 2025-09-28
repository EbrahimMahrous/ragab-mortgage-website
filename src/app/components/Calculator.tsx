"use client";

import { useState } from "react";

export default function Calculator() {
  const [amount, setAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("4.35");
  const [tenureYears, setTenureYears] = useState<string>("");
  const [tenureMonths, setTenureMonths] = useState<string>("");
  const [desiredEMI, setDesiredEMI] = useState<string>("");
  const [desiredTenureYears, setDesiredTenureYears] = useState<string>("");
  const sanitizeNumber = (value: string): number => {
    const num = parseFloat(value) || 0;
    return Math.max(0, num);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      e.target.value = "";
    }
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    if (e.target.value === "") {
      setter("0");
    }
  };

  const calculateEMI = (): number => {
    const principal = sanitizeNumber(amount);
    const annualRate = sanitizeNumber(interestRate);
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths =
      sanitizeNumber(tenureYears) * 12 + sanitizeNumber(tenureMonths);

    if (totalMonths === 0 || monthlyRate === 0) {
      return 0;
    }

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    return isNaN(emi) ? 0 : emi;
  };

  const calculateLoanAmount = (): number => {
    const annualRate = sanitizeNumber(interestRate);
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = sanitizeNumber(desiredTenureYears) * 12;
    const emiValue = sanitizeNumber(desiredEMI);

    if (totalMonths === 0 || monthlyRate === 0) {
      return 0;
    }

    const loanAmount =
      (emiValue * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));

    return isNaN(loanAmount) ? 0 : loanAmount;
  };

  const emi: number = calculateEMI();
  const totalMonths: number =
    sanitizeNumber(tenureYears) * 12 + sanitizeNumber(tenureMonths);
  const totalAmount: number = emi * totalMonths;
  const totalInterest: number = totalAmount - sanitizeNumber(amount);
  const loanAmount: number = calculateLoanAmount();
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <section id="calculator" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Mortgage Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mortgage Calculator */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Mortgage Calculator
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Amount (AED)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlur(e, setAmount)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Enter loan amount"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">
                    AED
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interest Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlur(e, setInterestRate)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Interest rate"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tenure (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlur(e, setTenureYears)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tenure (Months)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlur(e, setTenureMonths)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Months (0-11)"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
              <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Calculation Results
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-indigo-100 dark:border-indigo-800">
                  <span className="text-gray-600 dark:text-gray-300">
                    Monthly Payment
                  </span>
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                    {formatCurrency(emi)} AED
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-indigo-100 dark:border-indigo-800">
                  <span className="text-gray-600 dark:text-gray-300">
                    Total Interest Payable
                  </span>
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                    {formatCurrency(totalInterest)} AED
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    Total Amount
                  </span>
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                    {formatCurrency(totalAmount)} AED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* EMI Calculator */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              EMI Calculator
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Desired EMI (AED)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={desiredEMI}
                    onChange={(e) => setDesiredEMI(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlur(e, setDesiredEMI)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Enter desired EMI"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">
                    AED
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tenure (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  value={desiredTenureYears}
                  onChange={(e) => setDesiredTenureYears(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={(e) => handleBlur(e, setDesiredTenureYears)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Years"
                />
              </div>
            </div>

            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Loan Eligibility
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    Desired Loan Amount Approx. (By DMI):
                  </span>
                  <span className="font-semibold text-green-700 dark:text-green-300">
                    {formatCurrency(loanAmount)} AED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </section>
  );
}
