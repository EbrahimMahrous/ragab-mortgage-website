"use client";

import { useState } from 'react';

export default function Calculator() {
  const [amount, setAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(4.35);
  const [tenureYears, setTenureYears] = useState(0);
  const [tenureMonths, setTenureMonths] = useState(0);
  const [desiredEMI, setDesiredEMI] = useState(0);
  const [desiredTenureYears, setDesiredTenureYears] = useState(0);

  const calculateEMI = () => {
    const principal = amount;
    const annualRate = interestRate;
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = tenureYears * 12 + tenureMonths;

    if (monthlyRate === 0) {
      return principal / totalMonths;
    }

    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    return isNaN(emi) ? 0 : emi;
  };

  const calculateLoanAmount = () => {
    const annualRate = interestRate;
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = desiredTenureYears * 12;

    if (monthlyRate === 0) {
      return desiredEMI * totalMonths;
    }

    const loanAmount = desiredEMI * (Math.pow(1 + monthlyRate, totalMonths) - 1) / 
                      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
    
    return isNaN(loanAmount) ? 0 : loanAmount;
  };

  const emi = calculateEMI();
  const totalAmount = emi * (tenureYears * 12 + tenureMonths);
  const totalInterest = totalAmount - amount;
  const loanAmount = calculateLoanAmount();

  return (
    <section id="calculator" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Mortgage Calculator
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mortgage Calculator */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Mortgage Calculator
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Loan Amount"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Interest Rate"
                  step="0.01"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tenure Years
                  </label>
                  <input
                    type="number"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Years"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tenure Months
                  </label>
                  <input
                    type="number"
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Months"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Total</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Monthly Payment</span>
                  <span className="font-medium text-gray-800 dark:text-white">{emi.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Interest Payable</span>
                  <span className="font-medium text-gray-800 dark:text-white">{totalInterest.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Amount</span>
                  <span className="font-medium text-gray-800 dark:text-white">{totalAmount.toFixed(2)} AED</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* EMI Calculator */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              EMI Calculator
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Desired EMI
                </label>
                <input
                  type="number"
                  value={desiredEMI}
                  onChange={(e) => setDesiredEMI(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Desired EMI"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tenure Years
                </label>
                <input
                  type="number"
                  value={desiredTenureYears}
                  onChange={(e) => setDesiredTenureYears(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Years"
                />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Total</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Desired Loan Amount Approx. (By DMI):</span>
                  <span className="font-medium text-gray-800 dark:text-white">{loanAmount.toFixed(2)} AED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}