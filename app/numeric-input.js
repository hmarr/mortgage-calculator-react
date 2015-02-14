import React from 'react';

export class NumericInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focussed: false,
      rawValue: this.formatNumber(props.value)
    };
  }

  handleFocus(event) {
    this.setState({
      focussed: true,
      rawValue: this.formatNumber(this.props.value)
    });
  }

  handleBlur(event) {
    this.setState({
      focussed: false,
      rawValue: this.formatNumber(this.props.value)
    });
  }

  handleChange(event) {
    let value = parseFloat(event.target.value.replace(/[^\d\.]/g, ''));
    if (isNaN(value)) {
      value = 0;
    }
    this.setState({ rawValue: event.target.value });
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    let value;
    if (this.state.focussed) {
      value = this.state.rawValue;
    } else {
      value = this.formatNumber(this.props.value);
    }

    return <input type="text"
             readOnly={this.props.readOnly}
             onFocus={this.handleFocus.bind(this)}
             onBlur={this.handleBlur.bind(this)}
             onChange={this.handleChange.bind(this)}
             value={value} />;
  }

  formatNumber(number) {
    if (isNaN(number)) {
      return '-';
    }
    return number.toFixed(this.props.dp).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

