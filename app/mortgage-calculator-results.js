import React from 'react';
import {NumericInput} from 'app/numeric-input';

export class MortgageCalculatorResultsTable extends React.Component {
  get mortgageSize() {
    const delta = this.props.mortgageInfo.propertyPrice -
      this.props.mortgageInfo.deposit;
    return Math.max(delta, 0);
  }

  get totalRepayment() {
    return this.monthlyRepayment * this.props.mortgageInfo.repaymentTerm * 12;
  }

  get totalCost() {
    return this.totalRepayment - this.mortgageSize;
  }

  get monthlyRepayment() {
    const monthlyInterest = this.props.mortgageInfo.interest / 100 / 12;
    const numPeriods = this.props.mortgageInfo.repaymentTerm * 12;
    return this.mortgageSize *
      ((monthlyInterest * Math.pow(1 + monthlyInterest, numPeriods)) /
       (Math.pow(1 + monthlyInterest, numPeriods) - 1));
  }

  get ltv() {
    return this.mortgageSize / this.props.mortgageInfo.propertyPrice * 100;
  }

  render() {
    return (
      <tbody className="results">
        <tr><th colSpan="3"></th></tr>
        <MortgageCalculatorResultRow name="Mortgage size"
          value={this.mortgageSize} unit="£" />
        <MortgageCalculatorResultRow name="Total repayment"
          value={this.totalRepayment} unit="£" />
        <MortgageCalculatorResultRow name="Lifetime cost"
          value={this.totalCost} unit="£" />
        <MortgageCalculatorResultRow name="Monthly repayment" dp="2"
          value={this.monthlyRepayment} unit="£" />
        <MortgageCalculatorResultRow name="LTV" value={this.ltv} unit="%" />
      </tbody>
    );
  }
}

class MortgageCalculatorResultRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
          <NumericInput readOnly value={this.props.value} dp={this.props.dp} />
        </td>
        <td>{this.props.unit}</td>
      </tr>
    );
  }
}


