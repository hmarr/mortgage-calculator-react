import React from 'react';
import {NumericInput} from 'app/numeric-input';
import {MortgageCalculatorInputsTable} from 'app/mortgage-calculator-inputs';
import {MortgageCalculatorResultsTable} from 'app/mortgage-calculator-results';

export class MortgageCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mortgageInfo: props.mortgageInfo };
  }

  handleMortgageInfoChange(value) {
    this.setState({ mortgageInfo: value });
  }

  render() {
    return (
      <table>
        <thead>
          <tr><th colSpan="3">Mortgage Calculator</th></tr>
        </thead>
        <MortgageCalculatorInputsTable
          mortgageInfo={this.state.mortgageInfo}
          onChange={this.handleMortgageInfoChange.bind(this)} />
        <MortgageCalculatorResultsTable
          mortgageInfo={this.state.mortgageInfo} />
      </table>
    );
  }
};
