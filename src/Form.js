import React, { Component } from 'react';
import './styles/Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.itemValue) {
      this.setState({ value: this.props.itemValue });
    }
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.props.id) {
      if (this.state.value === '') {
        this.props.deleteItem(this.props.id);
      } else {
        this.props.editItem(this.state.value, this.props.id);
      }
    } else {
      if (this.state.value !== '') {
        this.props.addItem(this.state.value);
        this.setState({ value: '' });
      } else return;
    }
  }
  render() {
    return (
      <form className="Form" onSubmit={this.handleSubmit}>
        {/* {this.props.label && (
          <label htmlFor="formInput">{this.props.label}</label>
        )} */}
        <input
          id="formInput"
          onChange={this.handleChange}
          type="text"
          placeholder={this.props.placeholder ? this.props.placeholder : null}
          value={this.state.value}
        />
        <button>{this.props.buttonValue}</button>
      </form>
    );
  }
}

export default Form;
