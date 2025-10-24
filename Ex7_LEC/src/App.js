import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    monthlySalary: '',
    existingEMI: '',
    loanAmount: ''
  });

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const validateInput = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || formData.age < 21 || formData.age > 60) 
      newErrors.age = 'Age must be between 21 and 60';
    if (!formData.monthlySalary || formData.monthlySalary <= 0) 
      newErrors.monthlySalary = 'Please enter valid monthly salary';
    if (!formData.existingEMI || formData.existingEMI < 0) 
      newErrors.existingEMI = 'Please enter valid existing EMI';
    if (!formData.loanAmount || formData.loanAmount <= 0) 
      newErrors.loanAmount = 'Please enter valid loan amount';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEligibility = () => {
    if (!validateInput()) return;

    const monthlyIncome = parseFloat(formData.monthlySalary);
    const existingEMI = parseFloat(formData.existingEMI);
    const requestedLoanAmount = parseFloat(formData.loanAmount);
    const age = parseInt(formData.age);

    // Calculate proposed EMI (assuming it's 10% of requested loan amount for simplicity)
    const proposedEMI = requestedLoanAmount * 0.1;

    // Calculate DTI ratio
    const dtiRatio = ((existingEMI + proposedEMI) / monthlyIncome) * 100;

    const reasons = [];
    let isEligible = true;

    // Check all conditions
    if (dtiRatio > 60) {
      reasons.push('DTI ratio exceeds 60%');
      isEligible = false;
    }

    if (age < 21 || age > 60) {
      reasons.push('Age should be between 21 and 60 years');
      isEligible = false;
    }

    if (requestedLoanAmount > monthlyIncome * 10) {
      reasons.push('Loan amount exceeds 10 times monthly salary');
      isEligible = false;
    }

    setResult({
      isEligible,
      reasons,
      dtiRatio: dtiRatio.toFixed(2)
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Loan Eligibility Checker</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                  {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Monthly Salary</label>
                  <input
                    type="number"
                    className={`form-control ${errors.monthlySalary ? 'is-invalid' : ''}`}
                    name="monthlySalary"
                    value={formData.monthlySalary}
                    onChange={handleInputChange}
                  />
                  {errors.monthlySalary && <div className="invalid-feedback">{errors.monthlySalary}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Existing EMI/Debts</label>
                  <input
                    type="number"
                    className={`form-control ${errors.existingEMI ? 'is-invalid' : ''}`}
                    name="existingEMI"
                    value={formData.existingEMI}
                    onChange={handleInputChange}
                  />
                  {errors.existingEMI && <div className="invalid-feedback">{errors.existingEMI}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Loan Amount Requested</label>
                  <input
                    type="number"
                    className={`form-control ${errors.loanAmount ? 'is-invalid' : ''}`}
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                  />
                  {errors.loanAmount && <div className="invalid-feedback">{errors.loanAmount}</div>}
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={calculateEligibility}
                >
                  Check Loan Eligibility
                </button>
              </form>

              {result && (
                <div className={`mt-4 alert ${result.isEligible ? 'alert-success' : 'alert-danger'}`}>
                  <h5 className="alert-heading">
                    {result.isEligible ? 'Eligible' : 'Not Eligible'}
                  </h5>
                  <p>DTI Ratio: {result.dtiRatio}%</p>
                  {!result.isEligible && (
                    <ul className="mb-0">
                      {result.reasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;