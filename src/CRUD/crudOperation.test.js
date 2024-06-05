import { render, fireEvent } from '@testing-library/react';
import CrudOperation from './crudOperation';

describe('validate function', () => {
  it('validates form fields correctly', () => {
    const { getByPlaceholderText, getByText } = render(<CrudOperation />);

    fireEvent.change(getByPlaceholderText('name'), { target: { value: '' } });
    fireEvent.change(getByPlaceholderText('username'), { target: { value: '' } });
    fireEvent.change(getByPlaceholderText('email'), { target: { value: 'invalidemail' } });
    fireEvent.change(getByPlaceholderText('phone number'), { target: { value: '123' } });
    fireEvent.change(getByPlaceholderText('address'), { target: { value: '' } });
    fireEvent.change(getByPlaceholderText('age'), { target: { value: '-10' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'weakpassword' } });
    fireEvent.change(getByPlaceholderText('ssn'), { target: { value: '123' } });

    fireEvent.click(getByText('Add Customer'));

  });
});

describe('Update customer function', () => {
    it('updates customer correctly', () => {
      const { getByPlaceholderText, getByText } = render(<CrudOperation />);
  
     
  
      // Simulate changing customer details
      fireEvent.change(getByPlaceholderText('name'), { target: { value: 'New Name' } });
      fireEvent.change(getByPlaceholderText('address'), { target: { value: 'New Address' } });
      fireEvent.change(getByPlaceholderText('email'), { target: { value: 'new@example.com' } });
      fireEvent.change(getByPlaceholderText('age'), { target: { value: '30' } });
      fireEvent.change(getByPlaceholderText('phone number'), { target: { value: '9876543210' } });
  
      // Simulate clicking the update button
      fireEvent.click(getByText('Add Customer'));
  

    });
  });
