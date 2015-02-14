import React from 'react';
import {MortgageCalculator} from 'app/mortgage-calculator';

const mortgageInfo = {
  propertyPrice: 200000,
  deposit: 30000,
  interest: 1.38,
  repaymentTerm: 30
};

React.render(
  <MortgageCalculator mortgageInfo={mortgageInfo} />,
  document.getElementById('container')
);
