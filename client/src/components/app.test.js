import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './app';
import { Provider } from 'react-redux';
import store from '../redux/store'
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
  render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>);
  fireEvent.click(screen.getAllByRole("link", {name: "Converter"})[0]);
  let txtF = screen.getByLabelText("Value");
  txtF.value = 5;
  let sel1 = screen.getByText("Select currency 1");
  let sel2 = screen.getByText("Select currency 2");
  sel1.text = "USD";
  sel2.text = "EUR";
  fireEvent.click(screen.getByRole("button"));
  let res = screen.getByText("0.00");
  expect(res).toHaveTextContent("0");
});
