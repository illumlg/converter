import {screen, fireEvent, waitFor} from '@testing-library/react';
import {render} from "./test-utils";
import '@testing-library/jest-dom';
import App from '../app';
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import React from "react";
import {setImmediate} from 'timers'
import socket from "../../socket";

global.setImmediate = setImmediate;
jest.setTimeout(30000)

test('renders learn react link', async () => {
  render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
  );
  fireEvent.click(screen.getAllByRole("link", {name: "Converter"})[0]);
  await waitFor(() => expect(screen.getAllByRole("option").map(item => item.text)).toContain("USD"));
  userEvent.type(screen.getByLabelText("Value"), "5");
  userEvent.selectOptions(screen.getAllByRole("combobox")[0], "USD");
  userEvent.selectOptions(screen.getAllByRole("combobox")[1], "EUR");
  fireEvent.click(screen.getByRole("button"));
  let res_value = Number.parseFloat(document.getElementsByClassName("conv_res_value")[0].textContent);
  let res_code = document.getElementsByClassName("conv_res_code")[0].textContent;
  let res_btc = Number.parseFloat(document.getElementsByClassName("conv_res_btc")[0].textContent);
  expect(res_value).toBeGreaterThan(0);
  expect(res_code).toBe("EUR");
  expect(res_btc).toBeGreaterThan(0);
});

afterAll(done => {
  socket.close();
  done();
})