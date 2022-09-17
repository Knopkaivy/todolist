import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firestore from './FirebaseConfig';
import './styles/Form.css';

// class Form extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: '',
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   componentDidMount() {
//     if (this.props.itemValue) {
//       this.setState({ value: this.props.itemValue });
//     }
//   }
//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//     if (this.props.id) {
//       if (this.state.value === '') {
//         this.props.deleteItem(this.props.id);
//       } else {
//         this.props.editItem(this.state.value, this.props.id);
//       }
//     } else {
//       if (this.state.value !== '') {
//         this.props.addItem(this.state.value);
//         this.setState({ value: '' });
//       } else return;
//     }
//   }
//   render() {
//     return (
//       <form className="Form" onSubmit={this.handleSubmit}>
//         <input
//           id="formInput"
//           onChange={this.handleChange}
//           type="text"
//           placeholder={this.props.placeholder ? this.props.placeholder : null}
//           value={this.state.value}
//           className="inpt"
//         />
//         <button className="btn btn-green">{this.props.buttonValue}</button>
//       </form>
//     );
//   }
// }
const Form = ({
  addItem,
  buttonValue,
  deleteItem,
  editItem,
  id,
  itemValue,
  placeholder,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (itemValue) {
      setValue(itemValue);
    }
  }, [itemValue]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      if (value === '') {
        deleteItem(id);
      } else {
        editItem(value, id);
      }
    } else {
      if (value !== '') {
        addItem(value);
        setValue('');
      } else return;
    }
  };
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <input
        id="formInput"
        onChange={handleChange}
        type="text"
        placeholder={placeholder ? placeholder : null}
        value={value}
        className="inpt"
      />
      <button className="btn btn-green">{buttonValue}</button>
    </form>
  );
};

export default Form;
