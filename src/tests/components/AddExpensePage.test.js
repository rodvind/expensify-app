import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses"


//let addExpense, history, wrapper
let startAddExpense, history, wrapper
beforeEach(() => {
  //addExpense = jest.fn();
  startAddExpense = jest.fn();
  history = { push: jest.fn() };
  //wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
  wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});
test('should render AddExpensePage correctly', () => {
  // Add couple of spies
  // const onSubmit = jest.fn();
  // const history = { push: jest.fn() };
  // Render it
  // const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history} />);
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  // const onSubmit = jest.fn();
  // const history = { push: jest.fn() };
  // const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history} />);
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  //expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});