import React from "react";
import { SingleDatePicker } from "react-dates";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  // We need to first, find the form and then submit to the form
  // We can find element by id, class name, or tag name
  // in this case, we want to find the tag name, and we only have
  // one form tag
  // Now that we have access to the form element in the ExpenseForm 
  // component, we need to simulate an event

  // On ExpenseForm, we use e.preventDefault, but here we didn't
  // introduce "e" to our simulate, so we'll get an error about
  // preventDefault of undefine. To fix this, we need to fake
  // e.preventDefault. We can pass "e" as the second argument
  // to simulate. We want to be an object, which has a single 
  // property, preventDefault which ia an arrow function that
  // returns nothing, and is enough to take care of the error
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });

  // On this point, we want to make what should've happened, actually
  // did happen, so we should now have a state for "error" that indeed
  // does contain something as oppose to be an empty string, and we can
  // test for that by fetching the state off of the wrapper
  // We're gonna write an expect statement that fetches the state and
  // makes sure that it's not an empty string (error), get the length
  // of the error field. If the length is zero we have a problem, as
  // we expect when we not pass a proper expense, error should be 
  // created and contains a message
  expect(wrapper.state('error').length).toBeGreaterThan(0);

  // at the ende we can wrap up this test case with the quick snapshot,
  // that's going to make sure the error is always rendered correctly
  // This is gonna make sure after erro state changes, that actually
  // does get rendered, and we want it too, we could add another
  // snapshot beforehand too, to make sure no error shows up
  // you can take as many snapshots as you want added to your test 
  // This is gonna make sure there are two snapshot matched up the
  // next time this test runs
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input changes', () => {
  const value = 'New description';
  const wrapper = shallow(<ExpenseForm />);
  // the goal here is to submit the change event
  // the first step is to access the element, input. When we
  // fond input, we're gonna match multiple inputs, because we
  // have multiple inputs inside of our components, so we only 
  // want to match the first input, which is for description
  wrapper.find('input').at(0).simulate('change', {
    target: {value}
  });
  // Make sure the state is changed correctly
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'New note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change',{
    target: {value}
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '12.122';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change',{
    target: {value}
  });
  expect(wrapper.state('amount')).toBe('');
});
// To get onSubmit tested. we use spy.
// First up, we have to render ExpenseForm with valid data,
// use fixture data
// Step two, simulate the submission
// Step three, make sure the state was cleared 
// Step four, we need to make sure that onSubmit prop was called
// with the correctly formatted object by using spies
// The whole goal of the spies is to create these functions that
// are the fake functions. They've created by Jest for us, and we
// can make assertions (expect) about them. We can check if the
// fake function was called, chck if it was called five times, we
// can check if it was called with the special arguments
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  //onSubmitSpy('Rodvin', 'Calgary');
  // It'll throw an error if the spy never get called
  //expect(onSubmitSpy).toHaveBeenCalled();
  //expect(onSubmitSpy).toHaveBeenLastCalledWith('Rodvin', 'Calgary');

  // We need to define onSubmit here as it would be called on
  // ExpenseForm
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  // After submission, the state (error) should be an empty string
  // and the spy should be callled with the specific arguments
  expect(wrapper.state('error')).toBe('');
  // we cannot access expenses[0] here, because it contains "id",
  // but our object on the ExpenseForm doesn't have the id property yet
  // as it is not actually added yet, so we define an object here
  // When we have valid data, the error got cleared, and 
  // the prop onSubmit gets called with the correct object
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('should set new date on date change', () => {
  const now = moment();

  const wrapper = shallow (<ExpenseForm />);

  // Trigger the prop from the child component, from SingleDatePicker
  // To do this, first we have to find the SingleDatePicker 
  // using wrapper to get one of its prop, onDateChange
  // prop('onDateChange') is going to give us back the handler we 
  // registered, and we call it with whatever data it needs to call
  // with which is a moment instance 
 
  wrapper.find(SingleDatePicker).prop('onDateChange')(now);
  

  // Checking if the state was correctly set
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calnndar focus on change', () => {
  const focused = true;
  const wrapper = shallow (<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});