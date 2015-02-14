import React from 'react/addons';
import {NumericInput} from 'app/numeric-input';

export class MortgageCalculatorInputsTable extends React.Component {
  handleChange(field, value) {
    this.props.onChange(React.addons.update(this.props.mortgageInfo, {
      [field]: { '$set': value }
    }));
  }

  render() {
    return (
      <tbody className="inputs">
        <MortgageCalculatorInputRow name="Property price" unit="£"
          onChange={this.handleChange.bind(this, 'propertyPrice')}
          value={this.props.mortgageInfo.propertyPrice} />
        <MortgageCalculatorInputRow name="Deposit" unit="£"
          onChange={this.handleChange.bind(this, 'deposit')}
          value={this.props.mortgageInfo.deposit} />
        <MortgageCalculatorInputRow name="Interest" unit="£" dp="3"
          onChange={this.handleChange.bind(this, 'interest')}
          value={this.props.mortgageInfo.interest} />
        <MortgageCalculatorInputRow name="Repayment term" unit="y"
          onChange={this.handleChange.bind(this, 'repaymentTerm')}
          value={this.props.mortgageInfo.repaymentTerm} />
      </tbody>
    );
  }
}

class MortgageCalculatorInputRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
          <NumericInput value={this.props.value} dp={this.props.dp}
            onChange={this.props.onChange} />
        </td>
        <td>{this.props.unit}</td>
      </tr>
    );
  }
}

